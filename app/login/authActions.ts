"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const result = await supabase.auth.signInWithPassword(data);
    if (result.data.user !== null) {
      revalidatePath("/", "layout");
      return {
        result: result,
      };
    } else {
      return { result: { data: null, error: "Authentication failed" } };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        avatar_url: formData.get("avatar_url") as string,
        provider: formData.get("provider") as string,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login/email?email_verified=true`,
    },
  };

  try {
    const result = await supabase.auth.signUp(data);
    console.log("signup actionresult", result);
    return { result: result };
    // redirect("/");
  } catch (error) {
    return {
      error: error,
    };
  }

  // revalidatePath("/", "layout");
}

export async function forgotPassword(formData: FormData) {
  const supabase = createClient();

  return;
  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get("email") as string,
  // };

  // try {
  //   const result = await supabase.auth.resetPasswordForEmail(data.email, {
  //     redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/forgot-password/email`,
  //   });
  //   if (result.data.user !== null) {
  //     revalidatePath("/", "layout");
  //     return {
  //       result: result,
  //     };
  //   } else {
  //     return { result: { data: null, error: "Authentication failed" } };
  //   }
  // } catch (error) {
  //   return {
  //     error: error,
  //   };
  // }
}
