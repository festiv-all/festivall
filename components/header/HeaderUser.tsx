"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabaseBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { CircleUserRound, LogOut, Ticket, UserCog } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function HeaderUser({ user }: { user: User | undefined }) {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    toast.success("Logout successful");
  };

  return (
    <>
      {user ? (
        <li className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="cursor-pointer h-6 w-6 text-gray-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 text-gray-700">
              <DropdownMenuItem className="cursor-pointer">
                <Ticket className="mr-2 h-4 w-4" />
                <span>구매 내역</span>
              </DropdownMenuItem>
              <Link href="/mypage">
                <DropdownMenuItem className="cursor-pointer">
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>내 정보</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>로그아웃</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      ) : (
        <li>
          <a
            href="/login"
            className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
          >
            로그인
          </a>
        </li>
      )}
    </>
  );
}
