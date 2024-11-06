import LoginForm from "@/components/auth/LoginForm";
import Header from "@/components/header/Header";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function EmailLoginPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base font-bold">Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 mt-4">
          <Link
            href="/forgot-password"
            className="text-xs text-blue-500 hover:underline"
          >
            Forgot your password?
          </Link>
          <p className="text-xs text-center w-full">
            Don&#39;t have an account?{"  "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </div>
    </div>
  );
}
