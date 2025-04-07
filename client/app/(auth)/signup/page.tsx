"use client";

import Button from "@/components/shared/Button";
import { signInUpUser } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const page = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors = {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!form.name) newErrors.name = "Name can't be empty";
    if (!form.lastname) newErrors.lastname = "Lastname can't be empty";
    if (!form.email) newErrors.email = "Email can't be empty";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Email isn't valid";
    if (!form.password) newErrors.password = "Password can't be empty";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => !err);
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
      setIsLoading(true);
      const res = await signInUpUser(form, "signup");

      if (res.type === "error") setErrorMessage(res.data);

      if (res.type === "success") {
        sessionStorage.setItem("token", JSON.stringify(res.data.token));

        const { email, _id, name, lastname } = res.data.result;

        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, _id, name, lastname })
        );

        router.push("/");
      }

      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="w-full max-w-[500px] rounded-lg bg-[#0D1117] text-white px-8 pt-4 pb-8"
    >
      <h1 className="text-2xl font-bold text-center my-4">Sign Up</h1>

      <div className="flex flex-col gap-0 sm:flex-row sm:gap-4">
        <div
          className={`flex flex-col gap-2 w-full mb-4 ${
            errors.name ? "text-red-500" : ""
          }`}
        >
          <label htmlFor="name" className="text-lg">
            Name
          </label>

          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={(e) => onChange(e)}
            className={`bg-white outline text-[#0D1117] h-10 rounded-md px-3 ${
              errors.name ? " border-2 border-red-500" : ""
            }`}
          />

          {errors.name && <p>{errors.name}</p>}
        </div>

        <div
          className={`flex flex-col gap-2 w-full mb-4 ${
            errors.lastname ? "text-red-500" : ""
          }`}
        >
          <label htmlFor="lastname" className="text-lg">
            Lastname
          </label>

          <input
            type="text"
            name="lastname"
            id="lastname"
            value={form.lastname}
            onChange={(e) => onChange(e)}
            className={`bg-white outline text-[#0D1117] h-10 rounded-md px-3 ${
              errors.lastname ? " border-2 border-red-500" : ""
            }`}
          />

          {errors.lastname && <p>{errors.lastname}</p>}
        </div>
      </div>

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

      <div
        className={`flex flex-col gap-2 w-full mb-4 ${
          errors.confirmPassword ? "text-red-500" : ""
        }`}
      >
        <label htmlFor="confirmPassword" className="text-lg">
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={(e) => onChange(e)}
          className={`bg-white outline text-[#0D1117] h-10 rounded-md px-3 ${
            errors.confirmPassword ? " border-2 border-red-500" : ""
          }`}
        />

        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>

      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-500">
          Sign In
        </Link>
      </p>

      <Button
        type="submit"
        variant="outline"
        classname="w-full mt-8 !bg-[#161B22] border-none text-white"
        dissabled={isLoading}
      >
        {isLoading ? "Loading" : "Sign Up"}
      </Button>
    </form>
  );
};

export default page;
