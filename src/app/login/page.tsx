"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

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

  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      setLoginError("Credenciais inválidas. Tente novamente.");
    } else {
      setLoginError(null);
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setLoginError("Erro ao fazer login com Google. Tente novamente.");
    } else {
      setLoginError(null);
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-125px)] items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Login
        </h2>
        {loginError && (
          <div className="mb-4 text-red-600 text-center">{loginError}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "O email é obrigatório" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 sm:p-3 focus:border-blue-500 focus:outline-none"
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
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "A senha é obrigatória" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 sm:p-3 focus:border-blue-500 focus:outline-none"
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
            className="w-full bg-gradient-blue hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold rounded-md py-2 sm:py-3"
          >
            Entrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            Não possui uma conta?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm sm:text-base text-gray-600">Ou logue pelo:</p>
          <button
            onClick={handleGoogleLogin}
            className="mt-2 text-blue-500 hover:underline"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
