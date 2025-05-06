"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../shared/Button";
import { fetchData, postMemoryData } from "@/lib/actions";
import { CommentsType, CommentType, UserType } from "@/types";
import Image from "next/image";

const MemoryComments = ({ memoryId }: { memoryId: string }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [comments, setComments] = useState<CommentsType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetchData(`/comments/${memoryId}`);

      setComments(res);
    };

    fetchComments();

    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if (!token || !user) return;

    setToken(JSON.parse(token));
    const parsedUser = JSON.parse(user);
    setUserId(parsedUser._id);
  }, []);

  const commentValidation = (comment: string) => {
    const trimmedComment = comment.trim();

    if (!isSubmited) return;

    if (!trimmedComment) {
      setError("Comment can not be empty");
      return;
    } else if (trimmedComment.length < 2) {
      setError("Comment must contain at least 2 letters");
      return;
    } else if (trimmedComment.length >= 100) {
      setError("Comment must not contain more than 100 letters");
      return;
    } else if (error) {
      setError("");
      return;
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.currentTarget.value;

    commentValidation(comment);

    setValue(comment);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) setError("You need to sign in before commenting");

    setIsLoading(true);
    if (!isSubmited) setIsSubmited(true);

    try {
      const res = await postMemoryData(
        { comment: value, author: userId, memory: memoryId },
        token,
        "comments"
      );

      if (res === "SUCCESS") {
        setValue("");
        setError("");
        setIsSubmited(false);

        const updatedComments = await fetchData(`/comments/${memoryId}`);
        setComments(updatedComments);
      }
    } catch (error: any) {
      throw new Error(`Something went wrong: ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full bg-primary-gray rounded-lg text-white px-3 py-4 md:px-6 md:py-8">
      <form
        className="flex flex-col items-end gap-4"
        onSubmit={(e) => onSubmit(e)}
      >
        <textarea
          onChange={(e) => onChange(e)}
          value={value}
          name="comment"
          id="comment"
          placeholder="Your comment..."
          className="w-full !h-40 bg-gray-500 rounded-lg resize-none outline-0 px-3 py-4"
        />

        {error && <p className="text-red-500 self-start text-sm">{error}</p>}

        <Button
          type="submit"
          variant="outline"
          classname="!bg-transparent hover:!bg-white border-white text-white hover:!text-primary-gray "
        >
          {isLoading ? "Loading..." : "Comment"}
        </Button>
      </form>

      <h3 className="text-lg mt-6 mb-4">Comments {comments.length}</h3>

      <div className="flex flex-col gap-6 max-h-[400px] overflow-y-scroll no-scrollbar">
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              alt="comment author"
              src={comment.author.avatar}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h4 className="text-sm font-semibold">
                {comment.author.name} {comment.author.lastname}
              </h4>

              <p className="text-sm text-gray-300">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryComments;
