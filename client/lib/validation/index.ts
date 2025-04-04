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
