import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Usuário cadastrado com sucesso",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao registrar o usuário" },
      { status: 500 }
    );
  }
}
