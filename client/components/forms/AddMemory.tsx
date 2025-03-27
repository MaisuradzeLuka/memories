"use client";

import { ChangeEvent, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { memorySchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Button from "../shared/Button";
import { onFileChange } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const AddMemory = () => {
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof memorySchema>>({
    resolver: zodResolver(memorySchema),
    defaultValues: { title: "", description: "", image: "" },
  });

  const onSubmit = (values: z.infer<typeof memorySchema>) => {
    console.log(values);
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { setValue, setError } = form;
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const result = await onFileChange(imageFile);

      if (result) {
        setImage(result as string);
        setValue("image", result as string, { shouldValidate: true });
      } else {
        setError("image", { message: "Couldn't upload image" });
      }
    }
  };

  const onDelete = () => {
    const { resetField } = form;

    resetField("image");
    setImage(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-8 mt-20"
      >
        {image ? (
          <div className="relative w-full flex max-w-[600px] aspect-video mx-auto group">
            <Image src={image} alt="memory image" fill className="rounded-md" />

            <div className="hidden absolute bottom-2 right-2 bg-white rounded-lg py-[2px] px-2 group-hover:flex">
              <button
                onClick={onDelete}
                className="flex justify-center items-center hover:text-red-500 transition cursor-pointer"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ) : (
          <>
            <label
              htmlFor="image"
              className="w-full flex justify-center items-center max-w-[600px] aspect-video mx-auto border border-dashed border-green rounded-md cursor-pointer"
            >
              <IoIosAddCircleOutline className="text-4xl text-green" />
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
              onChange={(e) => onChange(e)}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full max-w-[800px]">
              <FormLabel className="text-lg text-gray-600">Title</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  className={`!ring-0  text-gray-600 ${
                    form.getFieldState("title").error
                      ? "border-red-500"
                      : "border-gray-600"
                  }`}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full max-w-[800px]">
              <FormLabel className="text-lg text-gray-600">
                Descritpion
              </FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  className={`!ring-0  text-gray-600 resize-none h-30 ${
                    form.getFieldState("description").error
                      ? "border-red-500"
                      : "border-gray-600"
                  }`}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button variant="filled" type="submit" classname="w-max self-end">
          Add Memory
        </Button>
      </form>
    </Form>
  );
};

export default AddMemory;
