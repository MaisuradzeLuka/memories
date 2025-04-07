"use client";

import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const user = sessionStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token"));

  const onClick = () => {
    sessionStorage.clear();
    setIsLoggedIn("");
  };

  return (
    <nav className="flex justify-between py-5 px-10 ">
      <h1 className="text-green text-4xl font-semibold cursor-pointer ">
        <Link href="/">Memories</Link>
      </h1>

      <div className="flex items-center gap-4">
        <Link href="/addmemory">
          <Button variant="outline">Add Memory</Button>
        </Link>

        {isLoggedIn ? (
          <button onClick={onClick}>Sign out</button>
        ) : (
          <Link href="/signin" className=" text-lg hover:text-green transition">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
