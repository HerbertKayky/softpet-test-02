"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PetProps } from "@/utils/pet.type";

export default function Pets() {
  const [pets, setPets] = useState<PetProps[]>([]);

  useEffect(() => {
    api.get("/api/pet").then((response) => {
      setPets(response.data);
    });
  }, []);

  return (
    <main className="w-full max-w-7xl mx-auto px-2">
      <ul className="space-y-4">
        {pets.map((pet) => (
          <li key={pet.id} className="border rounded-lg p-4">
            <h2 className="text-2xl text-white">{pet.name}</h2>
            <p className="text-white">Raça: {pet.race}</p>
            <p className="text-white">Tipo: {pet.pet}</p>
            <p className="text-white">Dono: {pet.ownerName}</p>
            <p className="text-white">Telefone: {pet.phone}</p>
            <p className="text-white">
              Nascimento: {new Date(pet.birth).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
