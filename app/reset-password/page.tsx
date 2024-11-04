import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Header from "@/components/header/Header";

export default async function ResetPasswordPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="border-0 mx-auto max-w-md min-h-[80vh] px-4 py-24">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
