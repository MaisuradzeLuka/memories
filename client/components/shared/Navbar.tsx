import Link from "next/link";
import React from "react";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-5 px-10 ">
      <h1 className="text-green text-4xl font-semibold cursor-pointer ">
        <Link href="/">Memories</Link>
      </h1>

      <div>
        <Button variant="outline">
          <Link href="/addmemory">Add Memory</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
