"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Footer from "@/components/footer";
import { api } from "@/lib/api";
import Modal from "./_components/modal";
import PasswordInput from "./_components/password-input";
import UserDetails from "./_components/user-detail";
import { AxiosError } from "axios";

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

  const isGoogleUser = session?.user.provider === "google";

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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data?.error || "Erro ao alterar senha.");
      } else {
        setMessage("Erro inesperado.");
      }
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data?.error || "Erro ao alterar email.");
      } else {
        setMessage("Erro inesperado.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <UserDetails
        session={session}
        onChangeEmail={() => setShowChangeEmailModal(true)}
        onChangePassword={() => setShowChangePasswordModal(true)}
      />

      <Footer />

      {showChangeEmailModal && (
        <Modal
          title="Alterar Email"
          onClose={() => setShowChangeEmailModal(false)}
        >
          <div className="flex flex-col gap-4">
            {isGoogleUser ? (
              <p className="text-red-500">
                Usuários autenticados pelo Google não podem alterar o e-mail.
              </p>
            ) : (
              <>
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
              </>
            )}
            {message && <p className="text-sm text-gray-500">{message}</p>}
          </div>
        </Modal>
      )}

      {showChangePasswordModal && (
        <Modal
          title="Alterar Senha"
          onClose={() => setShowChangePasswordModal(false)}
        >
          <div className="flex flex-col gap-4">
            {isGoogleUser ? (
              <p className="text-red-500">
                Usuários autenticados pelo Google não podem alterar a senha.
              </p>
            ) : (
              <>
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
                  disabled={!oldPassword || !newPassword || !confirmPassword}
                >
                  Confirmar
                </button>
              </>
            )}
            {message && <p className="text-sm text-black">{message}</p>}
          </div>
        </Modal>
      )}
    </div>
  );
}
