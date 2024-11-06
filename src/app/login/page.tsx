"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      console.error("Erro ao fazer login:", result.error);
    } else {
      console.log("Login bem-sucedido");
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Seu email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "A senha é obrigatória" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Sua senha"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
          >
            Entrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Não possui uma conta?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Ou logue pelo:</p>
          <button
            onClick={() => signIn("google")}
            className="mt-2 text-blue-500 hover:underline"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
