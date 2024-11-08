import { useForm, SubmitHandler } from "react-hook-form";
import { PetProps } from "@/utils/pet.type";
import { api } from "@/lib/api";
import { PetModalProps } from "@/utils/pet-modal.type";
import { IoMdCalendar } from "react-icons/io";
import { PiDna } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import { FaEdit, FaPhoneVolume, FaRegUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

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
    formState: { errors, isValid },
  } = useForm<PetProps>({
    defaultValues: petData || {},
  });
  const { data: session } = useSession();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (petData) {
      // Formata a data para "yyyy-MM-dd"
      const formattedDate = petData.birth
        ? new Date(petData.birth).toISOString().split("T")[0]
        : "";

      reset({
        ...petData,
        birth: formattedDate,
      });
    }
  }, [petData, reset]);

  const handleFormSubmit: SubmitHandler<PetProps> = async (data) => {
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-20 p-4">
      <div className="bg-gradient-dark-blue shadow-xl w-full max-w-xl p-6 sm:p-10 rounded-lg border-2 border-blue-500">
        <div className="flex items-center justify-between mb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-blue p-3">
              <FaEdit size={35} color="#FFF" />
            </div>
            <h1 className="font-bold text-xl sm:text-2xl">Editar Pet</h1>
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
              <label className="text-white flex items-center gap-1">
                <MdOutlinePets size={20} color="#FFF" /> Nome
              </label>
              <input
                className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                placeholder="Nome do Pet"
                {...register("name", {
                  required: "Nome do animal é obrigatório",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white flex items-center gap-1">
                <PiDna size={20} color="#FFF" /> Animal
              </label>
              <div className="flex gap-2">
                <label className="w-full flex gap-2 items-center h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500">
                  <input type="radio" value="DOG" {...register("pet")} />
                  Cachorro
                </label>
                <label className="w-full flex gap-2 items-center h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500">
                  <input type="radio" value="CAT" {...register("pet")} />
                  Gato
                </label>
              </div>
              {errors.pet && (
                <span className="text-red-500">{errors.pet.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white flex items-center gap-1">
                <FaRegUserCircle size={20} color="#FFF" /> Dono
              </label>
              <input
                className="w-full h-10 pl-2 outline-none rounded-lg bg-transparent border-2 border-gray-500 text-gray-500"
                type="text"
                placeholder="Nome do Dono"
                {...register("ownerName", {
                  required: "Nome do dono é obrigatório",
                })}
              />
              {errors.ownerName && (
                <span className="text-red-500">{errors.ownerName.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white flex items-center gap-1">
                <PiDna size={20} color="#FFF" /> Raça
              </label>
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
              <label className="text-white flex items-center gap-1">
                <FaPhoneVolume size={20} color="#FFF" /> Telefone
              </label>
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
              <label className="text-white flex items-center gap-1">
                <IoMdCalendar size={20} color="#FFF" /> Nascimento (Aproximado)
              </label>
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
              disabled={!isValid || isSubmitting}
              className={`flex items-center justify-center gap-1 bg-gradient-blue text-white font-bold px-4 py-2 rounded-md w-full ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
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
    </div>
  );
};

export default EditPetModal;
