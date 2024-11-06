import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import HeaderUser from "./HeaderUser";
import { redirect } from "next/navigation";

export default async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  if (user && !user?.user_metadata.social_signup_confirmed) {
    redirect(
      `/signup/social?email=${user?.email}&provider=${user?.app_metadata.provider}`
    );
  }

  return (
    <div className="sticky z-50 top-0">
      <header className="max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-blur-md">
        <div className="mx-auto px-5 py-3 md:py-5 flex justify-between items-center">
          <Link href="/">
            <div className="text-md md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
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
              <HeaderUser user={user || undefined} />
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
