import MemoryComments from "@/components/forms/MemoryComments";
import { fetchData } from "@/lib/actions";
import { getRelativeTime } from "@/lib/utils";
import { MemoryType } from "@/types";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const memoryId: string = (await params).id;

  const memory: MemoryType = await fetchData(`/posts/${memoryId}`);

  return (
    <div className="w-full max-w-[1440px] flex flex-col xl:flex-row gap-4 xl:gap-8 px-4 py-10 mx-auto">
      <section className="w-full xl:w-1/2">
        <Image
          src={memory?.image}
          alt="memory image"
          width={300}
          height={300}
          className="w-full aspect-video rounded-sm"
        />
      </section>

      <section className="flex-1">
        <article className="flex flex-col gap-3">
          <h1 className="text-primary-gray text-3xl md:text-4xl">
            {memory?.title}
          </h1>

          <p className="text-gray-700">{memory?.description}</p>

          <p className="text-primary-gray text-lg">
            Created by: {memory?.author.name} {memory?.author.lastname}
          </p>

          <span className="text-gray-700">
            {getRelativeTime(memory?.createdAt)}
          </span>
        </article>

        <div className="bg-primary-gray w-full h-[1px] my-4" />

        <MemoryComments memoryId={memoryId} />
      </section>
    </div>
  );
};

export default page;
