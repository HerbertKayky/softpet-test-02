"use client";

import { useSession, signOut } from "next-auth/react";
import { FaEdit, FaKey, FaSignOutAlt } from "react-icons/fa";
import { LuUserCircle2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { api } from "@/lib/api";
import Footer from "@/components/footer";

export default function Profile() {
  const { data: session } = useSession();
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem!");
      return;
    }

    try {
      const response = await api.post("/api/user/change-password", {
        oldPassword,
        newPassword,
      });
      setMessage(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowChangePasswordModal(false);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Erro ao alterar senha.");
    }
  };

  const handleChangeEmail = async () => {
    try {
      const response = await api.post("/api/user/change-email", {
        newEmail,
      });
      setMessage(response.data.message);
      setNewEmail("");
      setShowChangeEmailModal(false);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Erro ao alterar email.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full mx-auto flex-grow">
        <h1 className="text-2xl text-white font-bold text-center mb-6">
          Perfil do Usuário
        </h1>

        <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 rounded-md bg-gradient-dark-blue shadow-lg">
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

          <div className="flex flex-col gap-2 mt-6">
            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-600"
              onClick={() => setShowChangeEmailModal(true)}
            >
              <FaEdit size={20} />
              Editar Email
            </button>

            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-600"
              onClick={() => setShowChangePasswordModal(true)}
            >
              <FaKey size={20} />
              Alterar Senha
            </button>

            <button
              className="bg-red-500 px-4 py-2 rounded-md text-white font-bold flex items-center justify-center gap-2 hover:bg-red-600"
              onClick={() => signOut()}
            >
              <FaSignOutAlt size={20} />
              Sair
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal para alterar email */}
      {showChangeEmailModal && (
        <Modal
          title="Alterar Email"
          onClose={() => setShowChangeEmailModal(false)}
        >
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Novo email"
              className="p-2 rounded-md outline-none border border-gray-300"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-bold hover:bg-blue-600"
              onClick={handleChangeEmail}
            >
              Confirmar
            </button>
            {message && <p className="text-sm text-gray-100">{message}</p>}
          </div>
        </Modal>
      )}

      {/* Modal para alterar senha */}
      {showChangePasswordModal && (
        <Modal
          title="Alterar Senha"
          onClose={() => setShowChangePasswordModal(false)}
        >
          <div className="flex flex-col gap-4">
            <PasswordInput
              label="Senha antiga"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <PasswordInput
              label="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <PasswordInput
              label="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-bold hover:bg-blue-600"
              onClick={handleChangePassword}
            >
              Confirmar
            </button>
            {message && <p className="text-sm text-black">{message}</p>}
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="p-2 rounded-md outline-none border border-gray-300 w-full"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
          onClick={toggleShowPassword}
        >
          {showPassword ? "👁️" : "🔒"}
        </button>
      </div>
    </div>
  );
}
