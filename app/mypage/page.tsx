import MypageTab from "@/components/mypage/MypageTab";
import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  console.log("mypage user:", user);

  return (
    <div className="container mx-auto max-w-5xl px-5 py-8 h-[calc(100vh-4rem)]">
      <MypageTab user={user.user || undefined} />
    </div>
  );
}
