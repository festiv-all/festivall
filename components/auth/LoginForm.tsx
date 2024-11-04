"use client";

import { login } from "@/app/login/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginFormData, loginSchema } from "@/lib/schema/userSchema";
import { supabaseBrowser } from "@/utils/supabase/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const confirmed = params.get("confirmed");
  const error = params.get("error");
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  console.log("confirmed", confirmed);
  useEffect(() => {
    if (confirmed === "success") {
      const timer = setTimeout(() => {
        toast.success("Email verified successfully.\nYou can now log in.");
      }, 500);

      return () => clearTimeout(timer);
    } else if (confirmed === "invalid") {
      const timer = setTimeout(() => {
        toast.error("The link is invalid or expired.");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [confirmed, error]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    const { result } = await login(formData);
    console.log("LoginForm - result", result);
    if (result?.data?.user?.id) {
      toast.success("Login successful");
      router.push("/");
    } else if (result?.error === "email_not_confirmed") {
      setIsEmailOpen(true);
      setButtonState(false);
    } else {
      toast.error("Login failed. Please check your email and password.");
    }
  };

  const handleResendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: watch("email"),
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login/email?email_verified=true`,
      },
    });
    setIsEmailOpen(false);
    toast.success("Confirmation email sent. Check your email please.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className="pl-10"
              required
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              {...register("password")}
              type="password"
              placeholder="********"
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full mt-6 bg-gray-800 disabled:bg-gray-400"
        disabled={isSubmitting || !isValid}
      >
        Log in
      </Button>
      <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
        <DialogContent className="rounded-md w-[95vw] md:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Email not confirmed</DialogTitle>
            <DialogDescription>
              Do you want to resend the confirmation email?
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              setButtonState(true);
              handleResendEmail(e);
            }}
          >
            <Input
              name="email"
              type="email"
              defaultValue={watch("email")}
              disabled
            />
            <Button
              type="submit"
              className="w-full mt-2 bg-gray-800 disabled:bg-gray-400"
              disabled={buttonState}
            >
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </form>
  );
}
