"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { PetProps } from "@/utils/pet.type";
import { api } from "@/lib/api";
import { PetModalProps } from "@/utils/pet-modal.type";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

const EditPetModal: React.FC<PetModalProps & { petData: PetProps | null }> = ({
  isOpen,
  onClose,
  onSuccess,
  petData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetProps>({
    defaultValues: petData || { }, // Defina valores padrão válidos
  });

  const [formData, setFormData] = useState<PetProps | null>(petData);

  useEffect(() => {
    if (petData) {
      setFormData(petData);
      reset(petData); // Reseta o formulário com os dados do pet
    }
  }, [petData, reset]);

  const handleFormSubmit: SubmitHandler<PetProps> = async (data) => {
    console.log(data);
    try {
      await api.put(`/api/pet/${data.id}`, data); // Atualiza o pet no backend
      onSuccess(); // Atualiza a lista de pets após a edição
      reset(); // Reseta o formulário
      onClose();
    } catch (error) {
      console.error("Erro ao editar pet:", error);
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
            <h1 className="font-bold text-lg md:text-3xl">Editar Pet</h1>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <IoMdClose size={35} />
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label className="text-white">Nome</label>
            <input
              className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
              type="text"
              {...register("name", {
                required: "Nome do animal é obrigatório",
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          {/* Adicione outros campos conforme necessário */}
          <button
            type="submit"
            className="bg-gradient-blue px-4 py-2 rounded-md text-white font-bold"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPetModal;
