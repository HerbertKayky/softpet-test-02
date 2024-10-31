"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { PetProps } from "@/utils/pet.type";
import { api } from "@/lib/api";
import { PetModalProps } from "@/utils/pet-modal.type";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
    defaultValues: petData || {},
  });
  const { data: session } = useSession();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    if (petData) reset(petData);
  }, [petData, reset]);

  const handleFormSubmit: SubmitHandler<PetProps> = async (data) => {
    if (petData && petData.userId !== Number(session?.user.id)) {
      setErrorModalOpen(true);
      return;
    }

    try {
      await api.put(`/api/pet/${data.id}`, data);
      onSuccess();
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao editar pet:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-20">
        <div className="bg-gradient-dark-blue shadow-xl w-full max-w-2xl p-20 rounded-lg border-2 border-blue-500">
          <div className="flex items-center justify-between mb-12 text-white">
            <div className="flex items-center gap-5">
              <div className="rounded-full bg-gradient-blue p-4">
                <AiOutlinePlusCircle size={40} color="#FFF" />
              </div>
              <h1 className="font-bold text-lg md:text-3xl">Editar Pet</h1>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300"
            >
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
            <button
              type="submit"
              className="bg-gradient-blue px-4 py-2 rounded-md text-white font-bold"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>

      {errorModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="text-red-500 font-semibold">
              Você só pode editar os pets que cadastrou.
            </p>
            <button
              onClick={() => setErrorModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPetModal;
