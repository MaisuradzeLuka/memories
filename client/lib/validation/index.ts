import { z } from "zod";

export const memorySchema = z.object({
  title: z
    .string()
    .min(2, { message: "Minimum 2 characters" })
    .max(100, { message: "Maximum 100 characters" }),
  description: z
    .string()
    .min(20, { message: "Minimum 20 characters" })
    .max(400, { message: "Maximum 400 characters" }),
  image: z.string().nonempty(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum 2 characters" })
    .max(100, { message: "Maximum 100 characters" }),
  lastname: z
    .string()
    .min(2, { message: "Minimum 2 characters" })
    .max(100, { message: "Maximum 100 characters" }),
  bio: z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .refine(
      (val) => val === undefined || (val.length >= 20 && val.length <= 400),
      { message: "Bio must be between 20 and 400 characters" }
    )
    .optional(),
  avatar: z.string().nonempty(),
});
