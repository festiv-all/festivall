import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function ForgotPasswordPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base font-bold">Reset password</CardTitle>
        <CardDescription>
          Enter your email that you used to sign up. We&apos;ll send a link to
          reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm user={data.user || undefined} />
      </CardContent>
    </div>
  );
}
