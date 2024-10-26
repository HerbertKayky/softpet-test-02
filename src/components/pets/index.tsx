"use client";

import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { api } from "@/lib/api";
import Container from "../container";
import { PetProps } from "@/utils/pet.type";

export default function PetsSearch() {
  const [pets, setPets] = useState<PetProps[]>([]);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async (name: string = "") => {
    try {
      const response = await api.get("/api/pet", {
        params: { name },
      });
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  };

  const handleSearch = () => {
    fetchPets(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleModal = (id: number) => {
    setOpenModal(openModal === id ? null : id);
  };

  return (
    <Container>
      <div className="flex w-full mb-6">
        <div className="flex w-full border-2 rounded-md border-gray-700 h-13 items-center justify-between">
          <div className="flex items-center gap-2 flex-grow">
            <div className="bg-gray-700 p-3">
              <CiSearch size={28} />
            </div>
            <input
              className="w-full outline-none bg-transparent text-white font-medium text-lg py-2"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            className="bg-gray-700 py-2 px-3 font-medium text-white rounded-md mr-2"
            onClick={handleSearch}
          >
            Pesquisar
          </button>
        </div>
        <button className="flex items-center gap-1 px-3 py-2 bg-gradient-blue text-white rounded-md font-bold ml-4">
          <AiOutlinePlusCircle size={28} color="#FFF" />
          Cadastrar
        </button>
      </div>

      <main className="w-full max-w-7xl mx-auto px-2">
        <ul className="flex flex-wrap gap-4">
          {pets.map((pet) => (
            <li
              key={pet.id}
              className="relative border rounded-lg p-4 bg-[#0c1224] shadow-lg flex-1 min-w-[250px] max-w-[300px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
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

              {openModal === pet.id && (
                <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 p-4 rounded-lg shadow-md z-10">
                  <p>Raça: {pet.race}</p>
                  <p>Tipo: {pet.pet}</p>
                  <p>Telefone: {pet.phone}</p>
                  <p>Nascimento: {new Date(pet.birth).toLocaleDateString()}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </Container>
  );
}
