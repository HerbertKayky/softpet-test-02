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
      <header className="flex flex-wrap items-center py-5 justify-between sm:py-10">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoimg} alt="Logo softmakers" width={50} height={50} />
            <h1 className="text-white font-medium text-2xl sm:text-3xl">
              SoftPet
            </h1>
          </Link>
          {session && (
            <Link
              className="text-sm sm:text-base font-medium text-white bg-gradient-blue px-2 py-1 rounded-md"
              href="/dashboard"
            >
              Meus pets
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="">
              <button
                onClick={() => signOut()}
                className="text-white flex gap-2"
              >
                Sair
                <FiLogOut size={24} color="#FFF" />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="">
                <FaRegUser size={24} color="#FFF" />
              </button>
            </Link>
          )}
        </div>
      </header>
    </Container>
  );
}
