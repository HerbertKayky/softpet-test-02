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

    if (!userId) {
      return NextResponse.json("User not authenticated", { status: 401 });
    }

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";

  try {
    const pets = await prismaClient.pet.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    return NextResponse.json(pets);
  } catch (err) {
    console.error("Erro ao buscar pets: ", err);
    return NextResponse.json(
      { error: "Falha ao buscar pets" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id, name, ownerName, phone, pet, race, birth } = await request.json();
  const session = await getServerSession(authOptions);

  try {
    const userId = session?.user.id ? Number(session.user.id) : undefined;

    if (!userId) {
      return NextResponse.json("User not authenticated", { status: 401 });
    }

    // Verifica se o pet existe e pertence ao usuário
    const existingPet = await prismaClient.pet.findUnique({
      where: { id: Number(id) },
    });

    if (!existingPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    // Atualiza o pet
    await prismaClient.pet.update({
      where: { id: Number(id) },
      data: {
        name,
        ownerName,
        phone,
        pet,
        race,
        birth: new Date(birth),
      },
    });

    return NextResponse.json({ message: "Pet updated successfully" });
  } catch (err) {
    console.error("Erro no servidor", err);
    return NextResponse.json(
      { error: "Failed to update pet" },
      { status: 400 }
    );
  }
}
