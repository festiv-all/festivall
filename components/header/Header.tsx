import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { CircleUserRound, LogOut, Ticket, UserCog } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  // const supabase = supabaseBrowser();

  const {
    data: { user },
  } = await createClient().auth.getUser();

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  // };

  return (
    <div className="sticky z-50 top-0">
      <header className="max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-blur-md">
        <div className="mx-auto px-3 md:px-6 py-4 md:py-8 flex justify-between items-center">
          <Link href="/">
            <div className="text-md md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Festivall
            </div>
          </Link>
          <nav>
            <ul className="text-sm md:text-md flex space-x-4 md:space-x-8 items-center">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
                >
                  이벤트
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
                >
                  소개
                </a>
              </li>
              {user ? (
                <li className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <CircleUserRound className="cursor-pointer h-6 w-6 text-gray-700" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 text-gray-700"
                    >
                      <DropdownMenuItem>
                        <Ticket className="mr-2 h-4 w-4" />
                        <span>구매 내역</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>내 정보</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
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
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
