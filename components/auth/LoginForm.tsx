"use client";

import { login } from "@/app/login/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginSchema } from "@/lib/schema/userSchema";
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";

export default function LoginForm({ user }: { user: User | undefined }) {
  const router = useRouter();
  const params = useSearchParams();
  const verified = params.get("verified");
  const code = params.get("code");
  const error = params.get("error");

  if (user) {
    router.push("/");
  }

  useEffect(() => {
    if (verified === "true" && code && !error) {
      // Use a state variable to trigger a custom message display
      const timer = setTimeout(() => {
        toast.success("Email verified successfully.\nYou can now log in.");
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [verified, code, error]);

  const {
    register,
    handleSubmit,
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
    // console.log("loginresult", result);
    if (result?.data?.user?.id) {
      toast.success("Login successful");
      router.push("/");
    } else if (result?.error) {
      toast.error("Login failed");
    } else {
      toast.error("Login failed");
    }
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
      {/* <Button
              type="submit"
              formAction={signup}
              className="w-full mt-6 bg-pink-700"
            >
              Sign up
            </Button> */}
    </form>
  );
}
