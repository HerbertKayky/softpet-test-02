import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const { newEmail } = await req.json();

    if (!newEmail) {
      return NextResponse.json(
        { error: "Novo email não fornecido" },
        { status: 400 }
      );
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já está em uso" },
        { status: 409 }
      );
    }

    await prismaClient.user.update({
      where: { email: session.user.email },
      data: { email: newEmail },
    });

    return NextResponse.json({ message: "Email alterado com sucesso!" });
  } catch (error) {
    console.error("Erro ao alterar o email:", error);
    return NextResponse.json(
      { error: "Erro ao alterar o email" },
      { status: 500 }
    );
  }
}
