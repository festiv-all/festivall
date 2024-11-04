import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Header from "@/components/header/Header";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    return redirect("/");
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base font-bold">Forgot password</CardTitle>
          <CardDescription>
            Enter your email that you used to sign up. We&apos;ll send a link to
            reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </div>
    </div>
  );
}
