import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient();

export async function POST(request: Request) {
  const { name, ownerName, phone, pet, race, birth } = await request.json();

  const session = await getServerSession(authOptions);

  try {
    const userId = session?.user.id ? Number(session.user.id) : undefined;

    await prismaClient.pet.create({
      data: {
        name,
        ownerName,
        phone,
        pet,
        race,
        birth: new Date(birth),
        userId,
      },
    });

    return NextResponse.json({ message: "pet cadastrado" });
  } catch (err) {
    console.log("Erro no servidor", err);
    return NextResponse.json(
      { error: "failed create new pet" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const pets = await prismaClient.pet.findMany();
    return NextResponse.json(pets);
  } catch (err) {
    console.error("Erro ao buscar pets: ", err);
    return NextResponse.json(
      { error: "Falha ao buscar pets" },
      { status: 500 }
    );
  }
}
