"use client";
import Image from "next/image";
import logoimg from "/public/logo.svg";
import Container from "../container";
import { FaRegUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

export function Header() {
  const { data: session } = useSession();

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
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-white hidden sm:inline">
                Olá, {session.user?.name}
              </span>
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
    </Container>
  );
}
