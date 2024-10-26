"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { PetProps } from "@/utils/pet.type";
import { api } from "@/lib/api";
import { PetModalProps } from "@/utils/pet-modal.type";

const PetModal: React.FC<PetModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { register, handleSubmit, reset } = useForm<PetProps>();

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Cadastrar Novo Pet</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <input
            {...register("name")}
            type="text"
            placeholder="Nome do Pet"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            {...register("ownerName")}
            type="text"
            placeholder="Nome do Dono"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            {...register("phone")}
            type="tel"
            placeholder="Telefone"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            {...register("pet")}
            type="text"
            placeholder="Tipo de Pet (ex: Cachorro)"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            {...register("race")}
            type="text"
            placeholder="Raça"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            {...register("birth")}
            type="date"
            className="w-full p-2 border rounded-md"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetModal;
