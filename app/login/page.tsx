import OauthForm from "@/components/auth/OauthForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/");
  }

  return (
    <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          우리가 찾는 모든 이벤트 Festivall
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-w-md px-16 mt-8">
        <OauthForm />
      </CardContent>
    </div>
  );
}
