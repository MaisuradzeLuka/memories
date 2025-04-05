import AddMemory from "@/components/forms/AddMemory";

const page = () => {
  return (
    <div className="max-w-[1440px] mx-auto  mb-15">
      <div className="border border-green rounded-lg py-15 px-4 mx-4">
        <h2 className="text-green text-4xl font-semibold text-center px-8">
          Create, remember and share your memories
        </h2>

        <AddMemory />
      </div>
    </div>
  );
};

export default page;
