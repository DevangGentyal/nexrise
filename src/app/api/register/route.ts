import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, niche, username } = body;

     // Hash entered password with MD5
     const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, niche, username },
    });

    return NextResponse.json(
      { message: "User registered successfully!", user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
