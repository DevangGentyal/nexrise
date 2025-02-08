import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { user_id, column, value } = body;

    // Ensure required fields are provided
    if (!user_id || !column || value === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the user record dynamically
    const updatedUser = await prisma.user.update({
      where: { user_id: user_id },
      data: { [column]: value },
    });

    return NextResponse.json(
      { message: "User updated successfully!", updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
