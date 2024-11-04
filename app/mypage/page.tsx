import Header from "@/components/header/Header";
import MypageTab from "@/components/mypage/MypageTab";
import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="px-5 py-8 h-[calc(100vh-4rem)]">
        <MypageTab user={user.user || undefined} />
      </div>
    </div>
  );
}
