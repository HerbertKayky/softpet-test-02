"use client";
import Image from "next/image";
import logoimg from "/public/logo.svg";
import Container from "../container";
import { FaRegUser } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export function Header() {
  const { data: session } = useSession();

  return (
    <Container>
      <header className="flex items-center py-10 justify-between">
        <div className="flex items-center gap-2">
          <Image src={logoimg} alt="Logo softmakers" width={60} />
          <h1 className="text-white font-medium text-3xl">SoftPet</h1>
        </div>

        {session ? (
          <>
            <h1 className="text-xl text-white">Olá {session?.user?.name}</h1>
            <button onClick={() => signOut()} className="">
              <FiLogOut size={27} color="#FFF" />
            </button>
          </>
        ) : (
          <button onClick={() => signIn("google")} className="">
            <FaRegUser size={27} color="#FFF" />
          </button>
        )}
      </header>
    </Container>
  );
}
