"use client";

import { updatePassword } from "@/app/login/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/lib/schema/userSchema";
import { supabaseBrowser } from "@/utils/supabase/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const code = searchParams.get("code");
  const supabase = supabaseBrowser();
  useEffect(() => {
    if (error || !code) {
      router.push("/");
    }
  }, [error, code]);

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: ResetPasswordFormData) => {
    const { error } = await updatePassword(formData?.password || "");
    if (error) {
      toast.error("Failed to update password");
    } else {
      await supabase.auth.signOut();
      toast.success("Password updated. Please login again.");
      router.push("/login/email");
    }
  };

  return !error ? (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base font-bold">Reset password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
                <p className="text-xs text-gray-500 p-1">
                  Lower/upper case, number and special character should be
                  included in 8-30 characters
                </p>
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10"
                  required
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-6 bg-gray-800 disabled:bg-gray-400"
            disabled={isSubmitting || !isValid}
          >
            Reset password
          </Button>
        </form>
      </CardContent>
    </>
  ) : (
    <div className="text-center text-base font-semibold">
      {error ? "Link is invalid or expired" : "Loading..."}
    </div>
  );
}
