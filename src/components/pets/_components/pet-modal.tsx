"use client";

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

const PetModal: React.FC<PetModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PetProps>();

  const handleFormSubmit: SubmitHandler<PetProps> = async (data) => {
    try {
      await api.post("/api/pet", data);
      onSuccess(); // Atualiza a lista de pets após o cadastro
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-20">
      <div className="bg-gradient-dark-blue shadow-xl w-full max-w-2xl p-20 rounded-lg border-2 border-blue-500">
        <div className="flex items-center justify-between mb-12 text-white">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-gradient-blue p-4">
              <AiOutlinePlusCircle size={40} color="#FFF" />
            </div>
            <h1 className="font-bold text-lg md:text-3xl">Cadastrar</h1>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <IoMdClose size={35} />
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <MdOutlinePets size={20} color="#FFF" />
                <label className="text-white">Nome</label>
              </div>
              <input
                className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
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

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <FaRegUserCircle size={20} color="#FFF" />
                <label className="text-white">Dono</label>
              </div>
              <input
                className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                placeholder="Nome Sobrenome"
                {...register("ownerName", {
                  required: "Nome do dono obrigatório",
                })}
              />
              {errors.ownerName && (
                <span className="text-red-500">{errors.ownerName.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <PiDna size={20} color="#FFF" />
                <label className="text-white">Raça</label>
              </div>
              <input
                className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                placeholder="Raça"
                {...register("race", { required: "Raça obrigatória" })}
              />
              {errors.race && (
                <span className="text-red-500">{errors.race.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <FaPhoneVolume size={20} color="#FFF" />
                <label className="text-white">Telefone</label>
              </div>
              <input
                className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                placeholder="(00) 0 0000-0000"
                {...register("phone", { required: "Telefone obrigatório" })}
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <IoMdCalendar size={20} color="#FFF" />
                <label className="text-white">
                  Nascimento <span className="text-gray-500">(Aproximado)</span>
                </label>
              </div>
              <input
                className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="date"
                {...register("birth", {
                  required: "Data de nascimento obrigatória",
                })}
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
              type="submit"
              className="flex items-center justify-center gap-1 bg-gradient-blue text-white font-bold px-4 py-2 rounded-md w-full"
              disabled={!isValid}
            >
              <AiOutlinePlusCircle size={26} color="#FFF" />
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetModal;
