import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Header from "@/components/header/Header";
import { Suspense } from "react";

export default async function ResetPasswordPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
