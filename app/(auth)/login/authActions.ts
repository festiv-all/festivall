"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const user = await supabase.auth.getUser();
  console.log("login action user", user);

  try {
    const result = await supabase.auth.signInWithPassword(data);
    console.log("login action result:", result.error?.code);
    if (result.data.user !== null) {
      revalidatePath("/", "layout");
      return {
        result: result,
      };
    } else if (result.error?.code === "email_not_confirmed") {
      return { result: { data: null, error: "email_not_confirmed" } };
    } else {
      return { result: { data: null, error: "invalid_credentials" } };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const origin = headers().get("origin");
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        provider: formData.get("provider") as string,
      },
      emailRedirectTo: `${origin}/login/email?email_verified=true`,
    },
  };

  try {
    const result = await supabase.auth.signUp(data);
    console.log("signup action result", result);
    return { result: result };
    // redirect("/");
  } catch (error) {
    return {
      error: error,
    };
  }

  // revalidatePath("/", "layout");
}

export async function forgotPassword({ email }: { email: string }) {
  const supabase = await createClient();

  try {
    const result = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm?next=/reset-password`,
    });
    return { result };
  } catch (error) {
    return { error };
  }
}

export async function updatePassword(password: string) {
  const supabase = await createClient();

  try {
    const result = await supabase.auth.updateUser({ password: password });
    revalidatePath("/", "layout");
    return { result };
  } catch (error) {
    return { error };
  }
}

export async function updateUserName(email: string, name: string) {
  const supabase = await createClient();

  try {
    const result = await supabase
      .from("users")
      .update({ name: name })
      .eq("email", email);
    return { result };
  } catch (error) {
    return { error };
  }
}

export const socialSignUp = async (formData: FormData) => {
  const supabase = await createClient();

  try {
    const result = await supabase.auth.updateUser({
      data: {
        name: formData.get("name") as string,
        social_signup_confirmed: true,
      },
    });
    return { result };
  } catch (error) {
    return { error };
  }
};
