"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiUserCircleLight, PiUserCircleFill } from "react-icons/pi";
import { UserType } from "@/types";

const Navbar = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (userData) {
      try {
        setUser(JSON.parse(userData) as UserType);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }

    if (token) {
      setIsLoggedIn(token);
    }
  }, []);
  const onClick = () => {
    sessionStorage.clear();
    setIsLoggedIn("");
  };

  return (
    <nav className="flex justify-between py-5 px-10 bg-[#212623] text-white">
      <h1 className=" text-4xl font-semibold cursor-pointer ">
        <Link href="/">Memories</Link>
      </h1>

      <div className="hidden items-center gap-4 sm:flex">
        {isLoggedIn ? (
          <div className="flex items-center gap-4 ml-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center bg-green rounded-full text-white w-10 h-10 border-[1px] border-black">
                {user?.name.slice(0, 1)}
              </span>

              <span className="font-normal">
                {user?.name} {user?.lastname}
              </span>
            </div>

            <button
              onClick={onClick}
              className="border border-transparent hover:border-red-500 hover:text-red-500 rounded-full px-3 py-[6px] transition"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <Link
              href="/signin"
              className="group flex items-center gap-2 text-md hover:border-white transition border border-[#212623] rounded-full px-3 py-[6px]"
            >
              <span className="text-xl group-hover:hidden transition">
                <PiUserCircleLight />
              </span>

              <span className="text-xl hidden group-hover:inline transition text-white">
                <PiUserCircleFill />
              </span>

              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>

      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xl cursor-pointer sm:hidden">
            <RxHamburgerMenu />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-col items-center bg-white mr-6 py-3 border-none shadow shadow-black">
            <DropdownMenuLabel className="flex flex-col items-center gap-3">
              <span className="flex items-center justify-center bg-green rounded-full text-white w-10 h-10 border-[1px] border-black">
                {user?.name.slice(0, 1)}
              </span>

              <span className="font-normal">
                {user?.name} {user?.lastname}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/addmemory">
                <Button variant="outline" classname="border-none -mt-2">
                  Add Memory
                </Button>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-md cursor-pointer border border-white rounded-full hover:border-red-500 hover:text-red-500 transition px-4">
              <button onClick={onClick}>Sign out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="sm:hidden">
          <Link
            href="/signin"
            className="group flex items-center gap-2 text-md hover:border-white transition border border-[#212623] rounded-full px-3 py-[6px]"
          >
            <span className="text-xl group-hover:hidden transition">
              <PiUserCircleLight />
            </span>

            <span className="text-xl hidden group-hover:inline transition text-white">
              <PiUserCircleFill />
            </span>

            <span>Sign In</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
