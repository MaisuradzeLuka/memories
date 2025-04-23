import { PostMemoryType, SignInFormType, SignUpFormType } from "@/types";

export const postMemory = async (body: PostMemoryType) => {
  try {
    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status !== 201) throw new Error(`Coudn't create memory`);

    return "SUCCESS";
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const fetchData = async (additionalUrl: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${additionalUrl}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const signInUpUser = async (
  formData: SignUpFormType | SignInFormType,
  additionalUrl: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${additionalUrl}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    if (res.status !== 200 && res.status !== 201) {
      return { type: "error", data: data.message };
    }

    return { type: "success", data };
  } catch (error: any) {
    throw new Error(`Couldn't sing up user: ${error.message}`);
  }
};

export const updateUser = async (body: any, token: string | null) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/onboarding`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const getUser = async (token: string | null) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(`Coudln't fetch the user: ${error.message}`);
  }
};
