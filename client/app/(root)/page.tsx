import { fetchData } from "@/lib/actions";
import { getRelativeTime } from "@/lib/utils";
import { MemoryType } from "@/types";
import { FaShare } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const memories: MemoryType[] = await fetchData("/posts");

  const newestMemories = memories.slice(0, 3);
  const restOfMeories = memories.slice(3);

  return (
    <>
      <section className="w-full bg-green px-6 py-16">
        <h2 className=" text-center w-max text-3xl sm:text-5xl font-bold text-white mx-auto mb-16">
          Latest Memories
        </h2>

        <div className="flex flex-col lg:flex-row justify-center gap-8 mx-auto max-w-[1440px]">
          <Link
            href={`/memories/${newestMemories[0]._id}`}
            className="relative w-full group overflow-hidden cursor-pointer"
          >
            <Image
              src={newestMemories[0].image}
              alt="blog image"
              width={400}
              height={200}
              className="w-full aspect-square lg:aspect-auto lg:h-full  object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="absolute left-4 bottom-4">
              <h3 className="  text-white text-2xl font-semibold transition-all duration-300 group-hover:underline">
                {newestMemories[0].title}
              </h3>

              <p className="text-gray-500 text-lg font-medium mt-2">
                {newestMemories[0].author} -{" "}
                {getRelativeTime(newestMemories[0].createdAt)}
              </p>
            </div>
          </Link>

          <div className="w-full lg:w-2/3 ">
            <Link
              href={`/memories/${newestMemories[1]._id}`}
              className="relative block w-full mb-4 group overflow-hidden"
            >
              <Image
                src={newestMemories[1].image}
                alt="blog image"
                width={400}
                height={200}
                className="w-full aspect-square lg:aspect-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute left-4 bottom-4">
                <h3 className="  text-white text-2xl font-semibold transition-all duration-300 group-hover:underline">
                  {newestMemories[1].title}
                </h3>

                <p className="text-gray-500 text-lg font-medium mt-2">
                  {newestMemories[1].author} -{" "}
                  {getRelativeTime(newestMemories[1].createdAt)}
                </p>
              </div>
            </Link>

            <Link
              href={`/memories/${newestMemories[2]._id}`}
              className="relative block w-full group overflow-hidden"
            >
              <Image
                src={newestMemories[2].image}
                alt="blog image"
                width={400}
                height={200}
                className="w-full aspect-square lg:aspect-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute left-4 bottom-4">
                <h3 className="  text-white text-2xl font-semibold transition-all duration-300 group-hover:underline">
                  {newestMemories[2].title}
                </h3>

                <p className="text-gray-500 text-lg font-medium mt-2">
                  {newestMemories[2].author} -{" "}
                  {getRelativeTime(newestMemories[2].createdAt)}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-6 py-16">
        <h2 className=" text-center w-max text-3xl sm:text-5xl font-bold text-green mx-auto mb-16 mt-4">
          In Case You Missed It
        </h2>

        <article>
          {restOfMeories.map((memory) => (
            <div key={memory._id}>
              <div className="flex gap-4">
                <Image
                  src={memory.image}
                  width={170}
                  height={80}
                  alt="memory image"
                  className="w-[170px] lg:w-[230px] h-[80px] lg:h-[100px] object-cover"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-medium text-md lg:text-xl">
                    {memory.title}
                  </h3>

                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-medium">
                      {memory.author} - {getRelativeTime(memory.createdAt)}
                    </p>

                    <Link
                      href={`/memories/${memory._id}`}
                      className="flex items-center gap-1 text-green text-sm cursor-pointer"
                    >
                      Details
                      <span>
                        <FaShare />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-black my-6" />
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
