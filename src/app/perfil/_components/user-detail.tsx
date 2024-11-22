"use client";

import { LuUserCircle2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaEdit, FaKey, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function UserDetails({
  session,
  onChangeEmail,
  onChangePassword,
}: {
  session: any;
  onChangeEmail: () => void;
  onChangePassword: () => void;
}) {
  return (
    <main className="w-full mx-auto flex-grow flex flex-col items-center p-4">
      <h1 className="text-xl sm:text-2xl text-white font-bold text-center mb-6">
        Perfil do Usuário
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-md p-6 rounded-lg bg-gradient-dark-blue shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <LuUserCircle2 size={28} color="#FFF" />
            <p className="text-white text-lg font-semibold">
              {session?.user?.name || "Usuário"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineEmail size={28} color="#FFF" />
            <p className="text-white text-lg font-semibold">
              {session?.user?.email || "email@dominio.com"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="bg-blue-500 px-4 py-3 rounded-md text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
            onClick={onChangeEmail}
          >
            <FaEdit size={20} />
            Editar Email
          </button>

          <button
            className="bg-blue-500 px-4 py-3 rounded-md text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
            onClick={onChangePassword}
          >
            <FaKey size={20} />
            Alterar Senha
          </button>

          <button
            className="bg-red-500 px-4 py-3 rounded-md text-white font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
            onClick={() => signOut()}
          >
            <FaSignOutAlt size={20} />
            Sair
          </button>
        </div>
      </div>
    </main>
  );
}
