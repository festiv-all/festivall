import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const code = searchParams.get("code"); // 소셜로그인
  const next = searchParams.get("next") ?? "/";
  const type = searchParams.get("type") as EmailOtpType | null;
  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const provider = user?.app_metadata.provider;
    const social_signup_confirmed = user?.user_metadata.social_signup_confirmed;
    const email = user?.email;
    const created_at = dayjs(user?.created_at);
    const diff = dayjs().diff(created_at, "second");
    console.log("confirm route user", user);
    console.log("confirm route diff", diff);

    if (
      (provider !== "email" && diff < 10) ||
      (provider !== "email" && !social_signup_confirmed)
    ) {
      const { data } = await supabase.auth.updateUser({
        data: {
          social_signup_confirmed: false,
        },
      });
      console.log("confirm route, social login user not confirmed", data);

      redirect(`/signup/social?email=${email}&provider=${provider}`);
    }

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (type === "signup") {
      if (error) {
        redirect("/login/email?confirmed=invalid");
      } else {
        await supabase.auth.signOut();
        redirect("/login/email?confirmed=success");
      }
    }

    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // return the user to an error page with instructions
  redirect("/error");
}
