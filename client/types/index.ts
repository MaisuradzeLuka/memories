import { memorySchema } from "@/lib/validation";
import { z } from "zod";

export type PostMemoryType = z.infer<typeof memorySchema> & {
  author: string;
};

export type CommentType = {
  comment: string;
  author: string;
  memory: string;
};

export type MemoryType = {
  author: { _id: string; name: string; lastname: string };
  createdAt: string;
  likeCount: number;
  image: string;
  description: string;
  title: string;
  _id: string;
};

export type SignUpFormType = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export type SignInFormType = {
  email: string;
  password: string;
};

export type UserType = {
  email: string;
  name: string;
  lastname: string;
  avatar: string;
  bio: string;
};
