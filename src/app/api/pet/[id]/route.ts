import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prismaClient = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { name, ownerName, phone, pet, race, birth } = await request.json();
  const session = await getServerSession(authOptions);

  try {
    const userId = session?.user.id ? Number(session.user.id) : undefined;

    if (!userId) {
      return NextResponse.json("User not authenticated", { status: 401 });
    }

    // Verifica se o pet existe e pertence ao usuário
    const existingPet = await prismaClient.pet.findUnique({
      where: { id: Number(params.id) }, // Capture o ID da URL
      include: { user: true }, // Inclui os dados do usuário para verificar a propriedade
    });

    if (!existingPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    // Verifica se o pet pertence ao usuário autenticado
    if (existingPet.userId !== userId) {
      return NextResponse.json(
        { error: "You do not have permission to edit this pet" },
        { status: 403 }
      );
    }

    // Atualiza o pet
    await prismaClient.pet.update({
      where: { id: Number(params.id) }, // Use o ID da URL para a atualização
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  try {
    const userId = session?.user.id ? Number(session.user.id) : undefined;

    if (!userId) {
      return NextResponse.json("User not authenticated", { status: 401 });
    }

    // Verifica se o pet existe e pertence ao usuário
    const existingPet = await prismaClient.pet.findUnique({
      where: { id: Number(params.id) }, // Capture o ID da URL
      include: { user: true }, // Inclui os dados do usuário para verificar a propriedade
    });

    if (!existingPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    // Verifica se o pet pertence ao usuário autenticado
    if (existingPet.userId !== userId) {
      return NextResponse.json(
        { error: "You do not have permission to delete this pet" },
        { status: 403 }
      );
    }

    // Deleta o pet
    await prismaClient.pet.delete({
      where: { id: Number(params.id) }, // Use o ID da URL para a exclusão
    });

    return NextResponse.json({ message: "Pet deleted successfully" });
  } catch (err) {
    console.error("Erro no servidor", err);
    return NextResponse.json(
      { error: "Failed to delete pet" },
      { status: 400 }
    );
  }
}
