import Link from "next/link";
import React from "react";
import Button from "./Button";

const Navbar = () => {
  const isLoggedIn = false;

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
          <div>Sign out</div>
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
