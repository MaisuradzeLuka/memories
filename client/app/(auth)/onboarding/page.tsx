"use client";

import Button from "@/components/shared/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUser, updateUser } from "@/lib/actions";
import { onFileChange } from "@/lib/utils";
import { updateUserSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { z } from "zod";

const Page = () => {
  const router = useRouter();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultUser, setDefaultUser] = useState({});

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(JSON.parse(storedToken));
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      const user = await getUser(token);

      setDefaultUser(user);
    };

    fetchUser();
  }, [token]);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: defaultUser.name || "",
      lastname: defaultUser.lastname || "",
      bio: defaultUser.bio || "",
      avatar: defaultUser.avatar || "/assets/placeholder_avatar.jpg",
    },
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { setValue, setError } = form;
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const result = await onFileChange(imageFile);

      if (result) {
        setAvatar(result as string);
        setValue("avatar", result as string, { shouldValidate: true });
      } else {
        setError("avatar", { message: "Couldn't upload image" });
      }
    }
  };

  const onDelete = () => {
    const { resetField } = form;

    resetField("avatar");
    setAvatar(null);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const res = await updateUser({ name: "name" }, token);

    console.log(res);

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[500px] rounded-lg bg-[#0D1117] text-white px-8 pt-4 pb-8"
      >
        <h1 className="text-2xl font-bold text-center my-4 mb-8">My Account</h1>

        <>
          <label
            htmlFor="image"
            className="relative w-[80px] h-[80px] flex justify-center items-center bg-gray-500  mx-auto rounded-full cursor-pointer group object-cover"
          >
            <Image
              src={form.getValues("avatar")}
              alt="user avatar"
              width={80}
              height={80}
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

        <div className="flex flex-col gap-0 sm:flex-row sm:gap-4 my-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    className={`!ring-0 bg-white text-[#0D1117] !h-10 rounded-md px-3 ${
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
                    className={`!ring-0 bg-white text-[#0D1117] !h-10 rounded-md px-3 ${
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
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>LastName</FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  className={`!ring-0 bg-white text-[#0D1117]  rounded-md px-3 resize-none h-30 ${
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
          classname="w-full mt-8 !bg-[#161B22] border-none text-white"
          dissabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </Button>

        <Button
          type="button"
          variant="outline"
          classname="w-full mt-3 !bg-[#161B22] border-none text-white"
          onClick={() => router.push("/")}
        >
          Skip
        </Button>
      </form>
    </Form>
  );
};

export default Page;
