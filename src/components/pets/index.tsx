"use client";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePets } from "react-icons/md";
import { FaEdit, FaPhoneVolume, FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdCalendar } from "react-icons/io";
import { PiDna } from "react-icons/pi";
import { LuUserCircle2 } from "react-icons/lu";

import { api } from "@/lib/api";
import Container from "../container";
import { PetProps } from "@/utils/pet.type";
import { useSession } from "next-auth/react";
import PetModal from "./_components/pet-modal";
import EditPetModal from "./_components/edit-pet-modal";
import DeletePetModal from "./_components/delete-pet-modal";

export default function PetsSearch() {
  const { data: session } = useSession();
  const [pets, setPets] = useState<PetProps[]>([]);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); // Novo estado para verificar se houve pesquisa
  const [editPetData, setEditPetData] = useState<PetProps | null>(null);
  const [deletePetData, setDeletePetData] = useState<PetProps | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async (name: string = "") => {
    try {
      const response = await api.get("/api/pet", { params: { name } });
      setPets(response.data);
      setSearchPerformed(true); // Marcar como pesquisa realizada
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  };

  const handleEditPet = (pet: PetProps) => {
    if (session?.user) {
      setEditPetData(pet);
      setIsModalOpen(false);
      setIsEditModalOpen(true);
    } else {
      alert("Você não pode editar esse pet");
    }
  };

  const handleDeletePet = (pet: PetProps) => {
    setDeletePetData(pet);
    setIsDeleteModalOpen(true);
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

  function calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  const handleOpenModal = () => {
    if (session?.user) {
      setIsModalOpen(true);
    } else {
      alert("Login necessário");
    }
  };

  return (
    <Container>
      {/* Search e Botão de cadastro */}
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
        <button
          className="flex items-center gap-1 px-3 py-2 bg-gradient-blue text-white rounded-md font-bold ml-4"
          onClick={handleOpenModal}
        >
          <AiOutlinePlusCircle size={28} color="#FFF" />
          Cadastrar
        </button>
      </div>

      <PetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPets}
      />

      <EditPetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchPets}
        petData={editPetData}
      />

      <DeletePetModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={fetchPets}
        petData={deletePetData}
      />

      {/* Pet List */}
      <main className="w-full mx-auto px-2">
        {pets.length > 0 ? (
          <ul className="flex flex-wrap gap-4 justify-center">
            {pets.map((pet) => (
              <li
                key={pet.id}
                className={`relative flex items-center w-full max-w-[275px] rounded-md py-3 my-1 ${
                  openModal === pet.id ? "outline-2 outline-blue-500" : ""
                } bg-gradient-dark-blue outline-none hover:outline-2 hover:outline-blue-500 transition-all`}
              >
                <div className="rounded-full p-3 mx-2 bg-gradient-blue">
                  <img
                    src={pet.pet === "CAT" ? "/cat.svg" : "/dog.svg"}
                    alt="ícone do animal"
                    className="w-10 h-10"
                  />
                </div>

                <div className="flex justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <MdOutlinePets size={22} color="#FFF" />
                      <p className="text-white text-lg">{pet.name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <LuUserCircle2 size={22} color="#FFF" />
                      <p className="text-white text-lg">{pet.ownerName}</p>
                    </div>
                  </div>

                  <button className="mr-2" onClick={() => toggleModal(pet.id)}>
                    {openModal === pet.id ? (
                      <IoIosArrowUp size={33} color="#FFF" />
                    ) : (
                      <IoIosArrowDown size={33} color="#FFF" />
                    )}
                  </button>
                </div>

                {openModal === pet.id && (
                  <div className="absolute z-10 left-0 top-full mt-3 w-full rounded-md p-4 bg-gradient-dark-blue outline outline-blue-500">
                    <div className="flex items-center gap-1 mb-2">
                      <PiDna size={20} color="#FFF" />
                      <p className="text-white">Raça: {pet.race}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <FaPhoneVolume size={20} color="#FFF" />
                      <p className="text-white">Telefone: {pet.phone}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      <IoMdCalendar size={20} color="#FFF" />
                      <p className="text-white">
                        Idade: {calculateAge(new Date(pet.birth))} Anos (
                        {new Date(pet.birth).toLocaleDateString("pt-BR")})
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEditPet(pet)}
                        className="bg-white px-4 py-2 rounded-md text-blue-600 font-bold flex items-center justify-center gap-2"
                      >
                        <FaEdit size={20} />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePet(pet)}
                        className="bg-gradient-blue px-4 py-2 rounded-md text-white font-bold flex items-center justify-center gap-2"
                      >
                        <FaRegTrashAlt size={20} />
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          searchPerformed && (
            <p className="text-center text-white text-lg">
              Esse pet não está cadastrado
            </p>
          )
        )}
      </main>
    </Container>
  );
}
