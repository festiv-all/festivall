import SocialSignUpForm from "@/components/auth/SocialSignUpForm";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
export default async function SocialSignUpPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base font-bold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="space-y-4">
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            }
          >
            <SocialSignUpForm />
          </Suspense>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center w-full">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </div>
    </div>
  );
}
