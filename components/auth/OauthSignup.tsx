"use client";

import { useUser } from "@/lib/store/user";
import { supabaseBrowser } from "@/utils/supabase/client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export default function OauthForm() {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const user = useUser();
  const [isOauthPopupOpen, setIsOauthPopupOpen] = useState(false);

  // useEffect(() => {
  //   if (user.user) {
  //     router.push("/");
  //   }
  // }, [user.user]);

  const handleLoginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/confirm",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  const handleLoginWithFacebook = () => {
    supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "/auth/confirm",
      },
    });
  };

  const handleLoginWithKakao = () => {
    supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "/auth/confirm",
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-3 text-gray-800 font-semibold">
      <Link href="/login/email">
        <Button variant="outline" className="w-full h-12 items-center">
          <Mail className="w-4 h-4 mr-2 text-gray-700" />
          이메일로 계속하기
        </Button>
      </Link>
      <Button
        variant="outline"
        onClick={handleLoginWithGoogle}
        className="w-full h-12"
      >
        {/* <Icons.google className="mr-2 h-4 w-4" /> */}
        구글 계정으로 계속하기
      </Button>
      <Button
        variant="outline"
        onClick={handleLoginWithKakao}
        className="w-full h-12"
      >
        {/* <Icons.kakao className="mr-2 h-4 w-4" /> */}
        카카오 계정으로 계속하기
      </Button>
      <Button
        variant="outline"
        onClick={handleLoginWithFacebook}
        className="w-full h-12"
      >
        {/* <Icons.facebook className="mr-2 h-4 w-4" /> */}
        페이스북 계정으로 계속하기
      </Button>
    </div>
  );
}
