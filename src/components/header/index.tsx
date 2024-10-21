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
      <header className="flex items-center py-10 justify-between">
        <div className="flex items-center gap-2">
          <Image src={logoimg} alt="Logo softmakers" width={60} />
          <h1 className="text-white font-medium text-3xl">SoftPet</h1>
          <h1 className="text-white text-xl">oii {session?.user?.email}</h1>
        </div>

        {session ? (
          <>
            <h1 className="text-xl text-white">Olá {session?.user?.name}</h1>
            <button onClick={() => signOut()} className="">
              <FiLogOut size={27} color="#FFF" />
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="">
              <FaRegUser size={27} color="#FFF" />
            </button>
          </Link>
        )}
      </header>
    </Container>
  );
}
