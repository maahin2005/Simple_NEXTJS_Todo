"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/add-todo");
  };
  return (
    <nav className="bg-[#181818]">
      <div className="flex w-full justify-between p-4 px-5 items-center">
        <h1 className="text-xl font-semibold">Todos</h1>
        <button
          onClick={handleNavigate}
          className="font-semibold border-2 border-transparent border-b-white hover:border-white px-3 p-1 bg-slate-800"
        >
          Add Todo
        </button>
        <ul className="flex justify-between gap-5">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <Link href={"/about"}>
            <li>About</li>
          </Link>
          <Link href={"/contact"}>
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
