"use client";

import Button from "@/components/shared/Button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUser, updateUser } from "@/lib/actions";
import { onFileChange } from "@/lib/utils";
import { updateUserSchema } from "@/lib/validation";
import { UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { z } from "zod";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      lastname: "",
      bio: "",
      avatar: "/assets/placeholder_avatar.jpg",
    },
  });

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    let token = null;

    if (storedToken) {
      token = JSON.parse(storedToken);
    } else {
      router.push("/signin");
    }

    try {
      const existingUser = async () => {
        const user = await getUser(token);

        form.reset({
          name: user.name || "",
          lastname: user.lastname || "",
          bio: user.bio || "",
          avatar: user.avatar || "/assets/placeholder_avatar.jpg",
        });

        setUser(user);
      };

      existingUser();
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
  }, []);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { setValue, setError } = form;
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const result = await onFileChange(imageFile);

      if (result) {
        setValue("avatar", result as string, { shouldValidate: true });
      } else {
        setError("avatar", { message: "Couldn't upload image" });
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    setIsLoading(true);
    const res = await updateUser(values, token);

    if (res) router.push("/");

    setIsLoading(false);
  };

  const onClick = () => {
    sessionStorage.clear();
    setUser(null);
    router.push("/");
  };

  return (
    <div className="max-w-[1100px]  mx-auto px-2 sm:px-4 mt-10 pb-10">
      <h1 className="text-4xl sm:text-6xl font-medium">My Account</h1>

      <h2 className="mb-10 mt-15 text-xl sm:text-2xl font-normal">
        Hi,{" "}
        <span className="text-green">
          {user?.name} {user?.lastname}
        </span>
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full text-primary-gray px-8 pt-4 pb-8"
        >
          <>
            <label
              htmlFor="image"
              className="relative w-[120px] h-[120px] flex justify-center items-center bg-gray-500  mx-auto rounded-full cursor-pointer group object-cover"
            >
              <Image
                src={form.getValues("avatar")}
                alt="user avatar"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />

              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <IoIosAddCircleOutline className="text-4xl text-green-500" />
              </div>
            </label>

            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
              onChange={(e) => onChange(e)}
            />
          </>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    className={`!ring-0 bg-white !border-[#0D1117] text-[#0D1117] !h-10 rounded-md px-3 ${
                      form.formState.errors.name
                        ? "border-red-500"
                        : "border-white"
                    }`}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lastname</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    className={`!ring-0 bg-white !border-[#0D1117] text-[#0D1117] !h-10 rounded-md px-3 ${
                      form.formState.errors.lastname
                        ? "border-red-500"
                        : "border-white"
                    }`}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>LastName</FormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    className={`!ring-0 bg-white !border-[#0D1117] text-[#0D1117]  rounded-md px-3 resize-none h-30 ${
                      form.formState.errors.bio
                        ? "border-red-500"
                        : "border-white"
                    }`}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="outline"
            classname="w-max mt-8 !bg-[#161B22] border-none text-white"
            dissabled={isLoading}
          >
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </form>
      </Form>

      <button
        onClick={onClick}
        className="border border-red-500 text-red-500 hover:text-white hover:bg-red-500 cursor-pointer rounded-full px-3 py-[6px] transition"
      >
        Sign out
      </button>
    </div>
  );
};

export default page;
