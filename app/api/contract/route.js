import { NextResponse } from "next/server";
import { listContract, addContract } from "@/controllers/contract.controller";

export async function GET() {
  try {
    const result = await listContract();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const insertId = await addContract(body);

    return NextResponse.json({
      success: true,
      id: insertId,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 400 }
    );
  }
}