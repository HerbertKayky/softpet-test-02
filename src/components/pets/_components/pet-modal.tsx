import { useForm, SubmitHandler } from "react-hook-form";
import { PetProps } from "@/utils/pet.type";
import { api } from "@/lib/api";
import { PetModalProps } from "@/utils/pet-modal.type";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoMdCalendar, IoMdClose } from "react-icons/io";
import { PiDna } from "react-icons/pi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { FaPhoneVolume, FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const PetModal: React.FC<PetModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PetProps>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit: SubmitHandler<PetProps> = async (data) => {
    setIsSubmitting(true);
    try {
      await api.post("/api/pet", data);
      onSuccess();
      toast.success("Pet criado com sucesso!");
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-20 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-dark-blue shadow-xl w-full max-w-xl p-6 sm:p-10 rounded-lg border-2 border-blue-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-blue p-3">
              <AiOutlinePlusCircle size={35} color="#FFF" />
            </div>
            <h1 className="font-bold text-xl sm:text-2xl">Cadastrar</h1>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <IoMdClose size={30} />
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <MdOutlinePets size={20} color="#FFF" />
                <label className="text-white">Nome</label>
              </div>
              <input
                className="w-full h-10 px-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                placeholder="Nome Sobrenome"
                {...register("name", {
                  required: "Nome do animal é obrigatório",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            {/* Animal */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <PiDna size={20} color="#FFF" />
                <label className="text-white">Animal</label>
              </div>
              <div className="flex gap-2">
                <label className="w-full h-10 flex items-center gap-2 text-white border-2 border-gray-500 rounded-lg p-1">
                  <input type="radio" value="DOG" {...register("pet")} />
                  Cachorro
                </label>
                <label className="w-full h-10 flex items-center gap-2 text-white border-2 border-gray-500 rounded-lg p-1">
                  <input type="radio" value="CAT" {...register("pet")} />
                  Gato
                </label>
              </div>
              {errors.pet && (
                <span className="text-red-500">{errors.pet.message}</span>
              )}
            </div>

            {/* Dono */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <FaRegUserCircle size={20} color="#FFF" />
                <label className="text-white">Dono</label>
              </div>
              <input
                className="w-full h-10 px-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                value={session?.user?.name || ""}
                readOnly
                {...register("ownerName", {
                  required: "Nome do dono obrigatório",
                })}
              />
              {errors.ownerName && (
                <span className="text-red-500">{errors.ownerName.message}</span>
              )}
            </div>

            {/* Raça */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <PiDna size={20} color="#FFF" />
                <label className="text-white">Raça</label>
              </div>
              <input
                className="w-full h-10 px-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                placeholder="Raça"
                {...register("race", { required: "Raça obrigatória" })}
              />
              {errors.race && (
                <span className="text-red-500">{errors.race.message}</span>
              )}
            </div>

            {/* Telefone */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <FaPhoneVolume size={20} color="#FFF" />
                <label className="text-white">Telefone</label>
              </div>
              <input
                className="w-full h-10 px-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                placeholder="(00) 0 0000-0000"
                {...register("phone", { required: "Telefone obrigatório" })}
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>

            {/* Data de Nascimento */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <IoMdCalendar size={20} color="#FFF" />
                <label className="text-white">Nascimento</label>
              </div>
              <input
                className="w-full h-10 px-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="date"
                {...register("birth", {
                  required: "Data de nascimento obrigatória",
                })}
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-white font-bold text-blue-600 px-4 py-2 rounded-md w-full"
            >
              <IoArrowBackCircleOutline size={24} />
              Voltar
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`flex items-center justify-center gap-2 bg-gradient-blue text-white font-bold px-4 py-2 rounded-md w-full ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <AiOutlinePlusCircle size={25} color="#FFF" />
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetModal;
