import { PetProps } from "@/utils/pet.type";
import { api } from "@/lib/api";
import { PetModalProps } from "@/utils/pet-modal.type";
import { IoMdCalendar } from "react-icons/io";
import { PiDna } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import { FaPhoneVolume, FaRegTrashAlt, FaRegUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const DeletePetModal: React.FC<
  PetModalProps & { petData: PetProps | null }
> = ({ isOpen, onClose, onSuccess, petData }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemovePet = async () => {
    if (!petData) return;

    setIsRemoving(true);
    try {
      await api.delete(`/api/pet/${petData.id}`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao remover pet:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-20 p-4">
      <div className="bg-gradient-dark-blue shadow-xl w-full max-w-xl p-6 sm:p-10 rounded-lg border-2 border-blue-500">
        <div className="flex items-center justify-between mb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-blue p-4">
              <FaRegTrashAlt size={35} color="#FFF" />
            </div>
            <h1 className="font-bold text-xl sm:text-2xl">Remover Pet</h1>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <IoMdClose size={35} />
          </button>
        </div>

        {petData && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-white flex items-center gap-1">
                  <MdOutlinePets size={20} color="#FFF" /> Nome
                </label>
                <input
                  readOnly
                  value={petData.name}
                  className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white flex items-center gap-1">
                  <PiDna size={20} color="#FFF" /> Animal
                </label>
                <input
                  readOnly
                  value={petData.pet === "DOG" ? "Cachorro" : "Gato"}
                  className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white flex items-center gap-1">
                  <FaRegUserCircle size={20} color="#FFF" /> Dono
                </label>
                <input
                  readOnly
                  value={petData.ownerName}
                  className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white flex items-center gap-1">
                  <PiDna size={20} color="#FFF" /> Raça
                </label>
                <input
                  readOnly
                  value={petData.race}
                  className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white flex items-center gap-1">
                  <FaPhoneVolume size={20} color="#FFF" /> Telefone
                </label>
                <input
                  readOnly
                  value={petData.phone}
                  className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white flex items-center gap-1">
                  <IoMdCalendar size={20} color="#FFF" /> Nascimento
                  (Aproximado)
                </label>
                <input
                  readOnly
                  value={new Date(petData.birth).toLocaleDateString()}
                  className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-300"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-1 bg-white font-bold text-blue-600 px-4 py-2 rounded-md w-full"
              >
                <IoArrowBackCircleOutline size={26} />
                Voltar
              </button>
              <button
                onClick={handleRemovePet}
                disabled={isRemoving}
                className={`flex items-center justify-center gap-1 bg-red-600 text-white font-bold px-4 py-2 rounded-md w-full ${
                  isRemoving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaRegTrashAlt size={23} color="#FFF" />
                {isRemoving ? "Removendo..." : "Remover Pet"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeletePetModal;
