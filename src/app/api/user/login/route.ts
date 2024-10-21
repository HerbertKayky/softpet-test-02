// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import { sign } from "jsonwebtoken";

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   const { email, password } = await request.json();

//   // Verifica se os campos são válidos
//   if (!email || !password) {
//     return NextResponse.json(
//       { error: "Email e senha são obrigatórios" },
//       { status: 400 }
//     );
//   }

//   // Busca o usuário no banco de dados
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   // Verifica se o usuário existe
//   if (!user) {
//     return NextResponse.json(
//       { error: "Usuário não encontrado" },
//       { status: 404 }
//     );
//   }

//   // Verifica se a senha do usuário está presente
//   if (!user.password) {
//     return NextResponse.json(
//       { error: "Senha não encontrada para este usuário" },
//       { status: 404 }
//     );
//   }

//   // Verifica a senha
//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
//   }

//   // Aqui você pode gerar um token JWT
//   const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
//     expiresIn: "1h",
//   });

//   return NextResponse.json({ message: "Login bem-sucedido", token });
// }
