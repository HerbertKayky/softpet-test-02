"use client";
import { useSession, signOut } from "next-auth/react";
import { FaEdit, FaKey, FaSignOutAlt } from "react-icons/fa";
import { LuUserCircle2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { api } from "@/lib/api";

export default function Profile() {
  const { data: session } = useSession();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Função para alterar a senha
  const handleChangePassword = async () => {
    try {
      const response = await api.post("/api/user/change-password", {
        oldPassword,
        newPassword,
      });
      setMessage(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setShowChangePassword(false);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Erro ao alterar senha.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full mx-auto flex-grow">
        <h1 className="text-2xl text-white font-bold text-center mb-6">
          Perfil do Usuário
        </h1>

        <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-md bg-gradient-dark-blue shadow-md">
          <div className="flex items-center gap-2">
            <LuUserCircle2 size={28} color="#FFF" />
            <p className="text-white text-lg font-semibold">
              Nome: {session?.user?.name || "Usuário"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineEmail size={28} color="#FFF" />
            <p className="text-white text-lg font-semibold">
              Email: {session?.user?.email || "email@dominio.com"}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button className="bg-white px-4 py-2 rounded-md text-blue-600 font-bold flex items-center justify-center gap-2">
              <FaEdit size={20} />
              Editar Email
            </button>

            <button
              className="bg-white px-4 py-2 rounded-md text-blue-600 font-bold flex items-center justify-center gap-2"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              <FaKey size={20} />
              Alterar Senha
            </button>

            {showChangePassword && (
              <div className="flex flex-col gap-2 mt-4">
                <input
                  type="password"
                  placeholder="Senha antiga"
                  className="p-2 rounded-md outline-none"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Nova senha"
                  className="p-2 rounded-md outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="bg-gradient-blue px-4 py-2 rounded-md text-white font-bold"
                  onClick={handleChangePassword}
                >
                  Confirmar Alteração
                </button>
                {message && <p className="text-white">{message}</p>}
              </div>
            )}

            <button
              className="bg-gradient-blue px-4 py-2 rounded-md text-white font-bold flex items-center justify-center gap-2"
              onClick={() => signOut()}
            >
              <FaSignOutAlt size={20} />
              Sair
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
