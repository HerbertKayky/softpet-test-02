"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PetProps } from "@/utils/pet.type";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // Ícones de seta

export default function Pets() {
  const [pets, setPets] = useState<PetProps[]>([]);
  const [openModal, setOpenModal] = useState<number | null>(null);

  useEffect(() => {
    api.get("/api/pet").then((response) => {
      setPets(response.data);
    });
  }, []);

  const toggleModal = (id: number) => {
    setOpenModal(openModal === id ? null : id); // Alternar entre abrir e fechar o modal
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-2">
      <ul className="flex flex-wrap gap-4"> {/* Usando flexbox para layout dinâmico */}
        {pets.map((pet) => (
          <li
            key={pet.id}
            className="relative border rounded-lg p-4 bg-[#0c1224] shadow-lg flex-1 min-w-[250px] max-w-[300px]" // Flex item dinâmico
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  {/* Ícones conforme o tipo de pet */}
                  {pet.pet === "cat" ? (
                    <img src="/cat-icon.svg" alt="Cat" className="w-8 h-8" />
                  ) : (
                    <img src="/dog-icon.svg" alt="Dog" className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl text-white">{pet.name}</h2>
                  <p className="text-gray-400">{pet.ownerName}</p>
                </div>
              </div>
              <button
                className="text-white"
                onClick={() => toggleModal(pet.id)}
              >
                {openModal === pet.id ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </button>
            </div>

            {/* Modal com as informações adicionais */}
            {openModal === pet.id && (
              <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 p-4 rounded-lg shadow-md z-10">
                <p>Raça: {pet.race}</p>
                <p>Tipo: {pet.pet}</p>
                <p>Telefone: {pet.phone}</p>
                <p>
                  Nascimento: {new Date(pet.birth).toLocaleDateString()}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
