"use client";
import Image from "next/image";
import logoimg from "/public/logo.svg";
import Container from "../container";
import { FaRegUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <header className="flex flex-wrap items-center justify-between py-5 sm:py-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoimg} alt="Logo Softmakers" width={50} height={50} />
            <h1 className="text-white font-semibold text-2xl sm:text-3xl">
              SoftPet
            </h1>
          </Link>

          {session && (
            <Link
              href="/dashboard"
              className="text-sm sm:text-base font-medium text-white bg-gradient-blue px-3 py-1.5 rounded-lg hover:bg-gradient-to-r from-blue-500 to-blue-700 transition-all"
            >
              Meus Pets
            </Link>
          )}

          <div>
            <IoMdNotificationsOutline
              onClick={() => setIsModalOpen(true)}
              className=""
              size={30}
              color="#FFF"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-white hidden sm:inline">
                Olá, {session.user?.name}
              </span>

              <Link
                href="/perfil"
                className="text-white hover:text-gray-300 transition-all"
                title="Configurações de Perfil"
              >
                <FaRegUser size={24} />
              </Link>

              <button
                onClick={() => signOut()}
                className="text-white flex items-center gap-2 hover:text-gray-300 transition-all"
              >
                Sair
                <FiLogOut size={20} color="#FFF" />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="text-white text-base font-medium hover:text-gray-300 transition">
                Entrar
              </button>
            </Link>
          )}
        </div>
      </header>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Sobre este Projeto</h2>
            <p className="text-gray-700 mb-6">
              Este projeto foi desenvolvido utilizando{" "}
              <strong>Next.js 14</strong> com o front-end hospedado na
              <strong> Vercel</strong>. A autenticação de usuários foi
              implementada com <strong>NextAuth</strong>, enquanto o banco de
              dados <strong>PostgreSQL</strong> está hospedado na{" "}
              <strong>Railway.app</strong>. O gerenciamento do banco de dados
              foi feito utilizando o <strong>Prisma ORM</strong>.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
