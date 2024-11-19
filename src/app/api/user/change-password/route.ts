import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Verifica se o usuário está autenticado
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { error: "Você precisa estar logado para alterar a senha." },
      { status: 401 }
    );
  }

  const { oldPassword, newPassword } = await req.json();

  // Verificação simples dos campos
  if (!oldPassword || !newPassword) {
    return NextResponse.json(
      { error: "Por favor, forneça a senha antiga e a nova senha." },
      { status: 400 }
    );
  }

  // Busca o usuário no banco de dados
  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
  });

  // Verifica se o usuário existe e se possui senha cadastrada
  if (!user || !user.password) {
    return NextResponse.json(
      { error: "Usuário não encontrado ou não possui senha cadastrada." },
      { status: 404 }
    );
  }

  // Verifica se a senha antiga está correta
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { error: "A senha antiga está incorreta." },
      { status: 400 }
    );
  }

  // Hash da nova senha
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Atualiza a senha no banco de dados
  await prismaClient.user.update({
    where: { email: session.user.email },
    data: { password: hashedPassword },
  });

  return NextResponse.json(
    { message: "Senha alterada com sucesso!" },
    { status: 200 }
  );
}
