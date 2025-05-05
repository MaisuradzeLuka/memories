"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../shared/Button";
import { fetchData, postMemoryData } from "@/lib/actions";
import { CommentType } from "@/types";

const MemoryComments = ({ memoryId }: { memoryId: string }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetchData(`/posts/comments/${memoryId}`);

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
        "/comments"
      );

      // if(res === 'SUCCESS')
    } catch (error: any) {
      throw new Error(`Something went wrong: ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full bg-[#212623] rounded-lg text-white px-3 py-4 md:px-6 md:py-8">
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
          classname="!bg-transparent hover:!bg-white border-white text-white hover:!text-[#212623] "
        >
          {isLoading ? "Loading..." : "Comment"}
        </Button>
      </form>

      <h3 className="text-lg mt-6 mb-4">Comments {comments.length}</h3>

      {comments.map((comment) => (
        <p key={comment.comment}>{comment.comment}</p>
      ))}
    </div>
  );
};

export default MemoryComments;
