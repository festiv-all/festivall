import { supabaseBrowser } from "@/utils/supabase/client";
import { Button } from "../ui/button";

export default function OauthForm() {
  const supabase = supabaseBrowser();
  const handleLoginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLoginWithKakao = () => {
    supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-3">
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
        // onClick={}
        className="w-full h-12"
      >
        {/* <Icons.facebook className="mr-2 h-4 w-4" /> */}
        페이스북 계정으로 계속하기
      </Button>
    </div>
  );
}
