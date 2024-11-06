"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/lib/api";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const router = useRouter();
  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = await api.post("/api/user/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Erro ao cadastrar usuário. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "O nome é obrigatório" })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Seu nome"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "O email é obrigatório" })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Seu email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Sua senha"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "A confirmação de senha é obrigatória",
                validate: (value) =>
                  value === password || "As senhas não coincidem",
              })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Confirme sua senha"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-blue hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Cadastrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Entre aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
