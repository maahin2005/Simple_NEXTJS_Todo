import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="bg-[#181818]">
      <div className="flex w-full justify-between p-5 items-center">
        <h1 className="text-xl font-semibold">Todos</h1>
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
