import pool from "@/lib/db";

export async function getContract() {
  const [rows] = await pool.query("SELECT * FROM kontrak");
  return rows;
}

export async function postContract({ client_name, otr, tenor, installment_amount }) {
  if (!client_name || !otr || !tenor) {
    throw new Error("client_name, otr, tenor are required");
  }

  const [result] = await pool.query(
    "INSERT INTO kontrak (client_name, otr) VALUES (?, ?)",
    [client_name, otr, tenor]
  );

  const contractId = result.insertId;

  const [resId] = await pool.query(
    `SELECT kontrak_no FROM kontrak WHERE id = ${contractId}`
  )

  const contractNo = resId[0].kontrak_no

  const submitDate = new Date();

  for (let i = 0; i < tenor; i++) {
    const dueDate = new Date(submitDate);
    dueDate.setMonth(dueDate.getMonth() + (i + 1));

    await pool.query(
      `INSERT INTO jadwal_angsuran (kontrak_no, angsuran_ke, angsuran_per_bulan, tanggal_jatuh_tempo)
       VALUES (?, ?, ?, ?)`,
      [contractNo, i + 1, installment_amount, dueDate]
    );
  }

  console.log(result, "ini adalah hasil contract");
  return contractId;
}
