"use client";

import Button from "@/components/shared/Button";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Page = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!form.email) newErrors.email = "Email can't be empty";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Email isn't valid";

    if (!form.password) newErrors.password = "Password can't be empty";

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value.trim() }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("gg");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[500px] rounded-lg bg-[#0D1117] text-white px-8 pt-4 pb-8"
    >
      <h1 className="text-2xl font-bold text-center my-4">Sign In</h1>

      <div
        className={`flex flex-col gap-2 w-full mb-4 ${
          errors.email ? "text-red-500" : ""
        }`}
      >
        <label htmlFor="email" className="text-lg">
          Email
        </label>

        <input
          type="text"
          name="email"
          id="email"
          value={form.email}
          onChange={(e) => onChange(e)}
          className={`bg-white outline text-[#0D1117] h-10 rounded-md px-3 ${
            errors.email ? " border-2 border-red-500" : ""
          }`}
        />

        {errors.email && <p>{errors.email}</p>}
      </div>

      <div
        className={`flex flex-col gap-2 w-full mb-4 ${
          errors.password ? "text-red-500" : ""
        }`}
      >
        <label htmlFor="password" className="text-lg">
          Password
        </label>

        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={(e) => onChange(e)}
          className={`bg-white outline text-[#0D1117] h-10 rounded-md px-3 ${
            errors.password ? " border-2 border-red-500" : ""
          }`}
        />

        {errors.password && <p>{errors.password}</p>}
      </div>

      <p className="mt-6 text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>

      <Button
        type="submit"
        variant="outline"
        classname="w-full mt-8 !bg-[#161B22] border-none text-white"
      >
        Sign In
      </Button>
    </form>
  );
};

export default Page;
