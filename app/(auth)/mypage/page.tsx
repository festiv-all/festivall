import Header from "@/components/header/Header";
import MypageTab from "@/components/mypage/MypageTab";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

export default async function MyPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="px-5 py-8 h-[calc(100vh-4rem)]">
        <Suspense
          fallback={
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          }
        >
          <MypageTab user={user.user || undefined} />
        </Suspense>
      </div>
    </div>
  );
}
