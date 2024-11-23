import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prismaClient from "@/lib/prisma";

export default async function CadastroPet() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  async function handleRegisterPet(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const ownerName = formData.get("ownerName");
    const phone = formData.get("phone");
    const petType = formData.get("petType");
    const race = formData.get("race");
    const birth = formData.get("birth");

    if (!name || !ownerName || !phone || !petType || !race || !birth) {
      return;
    }

    if (!session?.user.id) {
      return;
    }

    await prismaClient.pet.create({
      data: {
        name: name as string,
        ownerName: ownerName as string,
        phone: phone as string,
        pet: petType as string,
        race: race as string,
        birth: new Date(birth as string),
        userId: Number(session.user.id),
      },
    });
    redirect("/");
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-2">
      <form className="flex flex-col mt-6" action={handleRegisterPet}>
        <label className="mb-1 font-medium text-lg">Nome do Pet</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="text"
          placeholder="Digite o nome do pet"
          required
          name="name"
        />

        <label className="mb-1 font-medium text-lg">Nome do Dono</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="text"
          placeholder="Digite o nome do dono"
          required
          name="ownerName"
        />

        <label className="mb-1 font-medium text-lg">Telefone</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="tel"
          placeholder="Digite o telefone"
          required
          name="phone"
        />

        <label className="mb-1 font-medium text-lg">Tipo de Pet</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="text"
          placeholder="Digite o tipo de pet"
          required
          name="petType"
        />

        <label className="mb-1 font-medium text-lg">Raça</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="text"
          placeholder="Digite a raça do pet"
          required
          name="race"
        />

        <label className="mb-1 font-medium text-lg">Data de Nascimento</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="date"
          placeholder="Data de nascimento do pet"
          required
          name="birth"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Cadastrar Pet
        </button>
      </form>
    </main>
  );
}
