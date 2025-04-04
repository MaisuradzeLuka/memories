import { memorySchema } from "@/lib/validation";
import { z } from "zod";

export type PostMemoryType = z.infer<typeof memorySchema> & {
  author: string;
};

export type MemoryType = {
  author: string;
  createdAt: string;
  likeCount: number;
  image: string;
  description: string;
  title: string;
  _id: string;
};
