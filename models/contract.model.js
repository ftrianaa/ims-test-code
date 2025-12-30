import pool from "@/lib/db";

export async function getContract() {
  const [rows] = await pool.query("SELECT * FROM contract");
  return rows;
}

export async function postContract({ client_name, otr, tenor, installment_amount }) {
  if (!client_name || !otr || !tenor) {
    throw new Error("client_name, otr, tenor are required");
  }

  const [result] = await pool.query(
    "INSERT INTO contract (client_name, otr) VALUES (?, ?)",
    [client_name, otr, tenor]
  );

  const contractId = result.insertId;

  const [resId] = await pool.query(
    `SELECT contract_no FROM contract WHERE id = ${contractId}`
  )

  const contractNo = resId[0].contract_no

  const submitDate = new Date();

  for (let i = 0; i < tenor; i++) {
    const dueDate = new Date(submitDate);
    dueDate.setMonth(dueDate.getMonth() + (i + 1));

    await pool.query(
      `INSERT INTO installment_schedule (contract_no, installment, installment_amount, due_date)
       VALUES (?, ?, ?, ?)`,
      [contractNo, i + 1, installment_amount, dueDate]
    );
  }

  console.log(result, "ini adalah hasil contract");
  return contractId;
}
