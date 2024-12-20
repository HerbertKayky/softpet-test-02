"use client";
import { useEffect, useState } from "react";
import { AiOutlineAudio, AiOutlinePlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePets } from "react-icons/md";
import { FaEdit, FaPhoneVolume, FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdCalendar } from "react-icons/io";
import { PiDna } from "react-icons/pi";
import { LuUserCircle2 } from "react-icons/lu";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

import { api } from "@/lib/api";
import { PetProps } from "@/utils/pet.type";
import { useSession } from "next-auth/react";
import PetModal from "./_components/pet-modal";
import EditPetModal from "./_components/edit-pet-modal";
import DeletePetModal from "./_components/delete-pet-modal";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";
import Image from "next/image";

export default function PetsSearch() {
  const { data: session } = useSession();
  const [pets, setPets] = useState<PetProps[]>([]);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPetData, setEditPetData] = useState<PetProps | null>(null);
  const [deletePetData, setDeletePetData] = useState<PetProps | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPets(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchPets = async (name: string = "", page: number = 1) => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/pet", {
        params: { name, page, limit: 25 },
      });
      setPets(response.data.pets);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPets(searchTerm, nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      fetchPets(searchTerm, previousPage);
    }
  };

  const handleEditPet = (pet: PetProps) => {
    if (Number(session?.user?.id) === pet.userId) {
      setEditPetData(pet);
      setIsModalOpen(false);
      setIsEditModalOpen(true);
    } else {
      alert("Você não pode editar esse pet");
    }
  };

  const handleDeletePet = (pet: PetProps) => {
    if (Number(session?.user?.id) === pet.userId) {
      setDeletePetData(pet);
      setIsDeleteModalOpen(true);
    } else {
      alert("Você não pode remover esse pet");
    }
  };

  const toggleModal = (id: number) => {
    setOpenModal(openModal === id ? null : id);
  };

  function calculateAge(birthDate: Date): string {
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

    if (age < 1) {
      const months =
        monthDifference >= 0 ? monthDifference : 12 + monthDifference;

      return `${months} ${months === 1 ? "mês" : "meses"}`;
    }

    return `${age} ${age === 1 ? "ano" : "anos"}`;
  }

  const handleOpenModal = () => {
    if (session?.user) {
      setIsModalOpen(true);
    } else {
      alert("Login necessário");
    }
  };

  const { handleVoiceSearch } = useVoiceSearch({
    onResult: (transcript) => {
      setSearchTerm(transcript);
      fetchPets(transcript);
    },
    onError: (error) => {
      console.error("Erro no reconhecimento de voz:", error);
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full mx-auto flex-grow">
        <div className="flex flex-wrap w-full mb-4 gap-2">
          <div className="flex flex-grow items-center border-2 rounded-md border-gray-700 h-12 sm:h-13">
            <div className="bg-gray-700 p-3">
              <CiSearch size={24} />
            </div>
            <input
              className="w-full outline-none bg-transparent text-white font-medium text-base sm:text-lg py-2 px-2"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do pet"
            />

            <button
              className="bg-gray-700 px-3 py-2 font-medium text-white rounded-md mr-2"
              onClick={handleVoiceSearch}
            >
              <AiOutlineAudio size={24} />
            </button>
          </div>
          <button
            className="flex items-center gap-1 px-3 py-2 bg-gradient-blue text-white rounded-md font-bold"
            onClick={handleOpenModal}
          >
            <AiOutlinePlusCircle size={24} />
            <span className="sm:inline">Cadastrar</span>
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-white font-semibold">
            Carregando, por favor aguarde...
          </p>
        ) : pets.length > 0 ? (
          <ul className="flex flex-wrap gap-4 justify-center">
            {pets.map((pet) => (
              <li
                key={pet.id}
                className={`relative flex items-center w-full max-w-[275px] rounded-md py-3 my-1 ${
                  openModal === pet.id ? "outline-2 outline-blue-500" : ""
                } bg-gradient-dark-blue outline-none hover:outline-2 hover:outline-blue-500 transition-all`}
              >
                <div className="rounded-full p-3 mx-2 bg-gradient-blue">
                  <Image
                    src={pet.pet === "CAT" ? "/cat.svg" : "/dog.svg"}
                    alt="ícone do animal"
                    className="w-10 h-10"
                    width={15}
                    height={15}
                  />
                </div>

                <div className="flex justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <MdOutlinePets size={22} color="#FFF" />
                      <p className="text-white text-lg">{pet.name}</p>
                      {Number(session?.user.id) === pet.userId && (
                        <p className="text-white bg-gradient-blue px-1 rounded-sm whitespace-nowrap">
                          Seu pet
                        </p>
                      )}
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
                        Idade: {calculateAge(new Date(pet.birth))} (
                        {new Date(pet.birth).toLocaleDateString("pt-BR")})
                      </p>
                    </div>

                    {Number(session?.user.id) === pet.userId && (
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
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          searchTerm && (
            <p className="text-white font-semibold text-center">
              Nenhum pet encontrado com esse nome.
            </p>
          )
        )}

        <PetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchPets}
        />

        <DeletePetModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={fetchPets}
          petData={deletePetData}
        />
        <EditPetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={fetchPets}
          petData={editPetData}
        />
      </main>
      <div className="flex justify-center sm:justify-end pb-3 pt-8">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <IoArrowBackCircleOutline size={30} color="#FFF" />
        </button>
        <span className="px-2 py-2 text-white">
          {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <IoArrowForwardCircleOutline size={30} color="#FFF" />
        </button>
      </div>
    </div>
  );
}
