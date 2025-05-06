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
import { getUser } from "@/lib/actions";
import Image from "next/image";

const Navbar = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const token = storedToken ? JSON.parse(storedToken) : null;

    if (token) {
      try {
        const existingUser = async () => {
          const user = await getUser(token);

          setUser(user);
        };

        existingUser();
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }

    if (token) {
      setIsLoggedIn(token);
    }
  }, []);

  return (
    <nav className="flex justify-between py-5 px-10 bg-primary-gray text-white">
      <h1 className=" text-4xl font-semibold cursor-pointer ">
        <Link href="/">Memories</Link>
      </h1>

      <div className="hidden items-center gap-4 sm:flex">
        {isLoggedIn ? (
          <div className="flex items-center gap-4 ml-2 text-xs l">
            <Link href="/addmemory">
              <Button
                variant="outline"
                classname="border-none !bg-transparent text-white hover:!text-green !p-0"
              >
                Add Memory
              </Button>
            </Link>

            <Link
              href="/myaccount"
              className="flex items-center gap-2 border border-white rounded-full px-4 py-2 hover:bg-white hover:text-primary-gray transition"
            >
              <Image
                src={user?.avatar || "/assets/placeholder_avatar.jpg"}
                alt="user avatar"
                height={20}
                width={20}
                className="flex items-center justify-center bg-green rounded-full text-white w-6 h-6 border-[1px] border-black object-cover"
              />

              <span className="font-normal">Hi, {user?.name}</span>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              href="/signin"
              className="group flex items-center gap-2 text-md hover:border-white transition border border-primary-gray rounded-full px-3 py-[6px]"
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
            <DropdownMenuItem>
              <Link href="/myaccount">
                <Image
                  src={user?.avatar || "/assets/placeholder_avatar.jpg"}
                  alt="user avatar"
                  height={40}
                  width={40}
                  className="flex items-center justify-center bg-green rounded-full text-white w-10 h-10 border-[1px]  border-black object-cover"
                />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                href="/myaccount"
                className="flex items-center gap-2 border border-primary-gray rounded-full px-4 py-2 text-md hover:bg-primary-gray hover:text-white transition"
              >
                <span className="font-normal">Hi, {user?.name}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/addmemory">
                <Button variant="outline" classname="border-none -mt-2">
                  Add Memory
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="sm:hidden">
          <Link
            href="/signin"
            className="group flex items-center gap-2 text-md hover:border-white transition border border-primary-gray rounded-full px-3 py-[6px]"
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
