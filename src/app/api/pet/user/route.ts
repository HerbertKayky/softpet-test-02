import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const offset = (page - 1) * limit;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const userId = session.user.id;

    const pets = await prismaClient.pet.findMany({
      where: {
        userId: Number(userId),
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      skip: offset,
      take: limit,
    });

    const totalPets = await prismaClient.pet.count({
      where: {
        userId: Number(userId),
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({
      pets,
      pagination: {
        total: totalPets,
        page,
        limit,
        totalPages: Math.ceil(totalPets / limit),
      },
    });
  } catch (err) {
    console.error("Erro ao buscar pets do usuário: ", err);
    return NextResponse.json(
      { error: "Falha ao buscar pets do usuário" },
      { status: 500 }
    );
  }
}
