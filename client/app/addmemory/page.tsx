import AddMemory from "@/components/forms/AddMemory";
import React from "react";

const page = () => {
  return (
    <div className="max-w-[1440px] mx-auto border border-green rounded-lg py-15 px-4 mb-15">
      <h2 className="text-green text-4xl font-semibold text-center px-8">
        Create, remember and share your memories
      </h2>

      <AddMemory />
    </div>
  );
};

export default page;
