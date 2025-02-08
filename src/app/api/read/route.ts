import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, column } = body;

    // Validate inputs
    if (!user_id || !column) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch the specific column dynamically
    const userData = await prisma.user.findUnique({
      where: { user_id: Number(user_id) }, // Ensure it's a number if needed
      select: { [column]: true }, // Dynamically select the column
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Data fetched successfully!", data: userData[column] },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
