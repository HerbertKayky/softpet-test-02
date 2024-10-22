"use client";

import { useContext, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { api } from "@/lib/api";
import Container from "../container";

export function Search() {
  return (
    <Container>
      <div className="flex w-full">
        <div className="flex w-full border-2 rounded-md border-gray-700 h-13 items-center justify-between">
          <div className="flex items-center gap-2 flex-grow">
            <div className="bg-gray-700 p-3">
              <CiSearch size={28} />
            </div>
            <input
              className="w-full outline-none bg-transparent text-white font-medium text-lg py-2"
              type="text"
            />
          </div>
          <button className="bg-gray-700 py-2 px-3 font-medium text-white rounded-md mr-2">
            Pesquisar
          </button>
        </div>

        <button className="flex items-center gap-1 px-3 py-2 bg-gradient-blue text-white rounded-md font-bold ml-4">
          <AiOutlinePlusCircle size={28} color="#FFF" />
          Cadastrar
        </button>
      </div>
    </Container>
  );
}
