import OauthSignup from "@/components/auth/OauthSignup";
import OauthForm from "@/components/auth/OauthSignup";
import SignUpForm from "@/components/auth/SignUpForm";
import Header from "@/components/header/Header";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/lib/store/user";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            내 주변의 즐거움 Festivall
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md px-16 mt-8">
          <OauthSignup />
        </CardContent>
      </div>
    </div>
  );
}
