import SignUpForm from "@/components/auth/SignUpForm";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base font-bold">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
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
  );
}
