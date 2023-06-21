import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: "Hello World" },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
