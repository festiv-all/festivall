"use client";

import { forgotPassword } from "@/app/login/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "@supabase/supabase-js";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitted, errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: ForgotPasswordFormData) => {
    const { result } = await forgotPassword({ email: formData.email || "" });

    console.log("forgotPassword result", result);
    if (result?.error) {
      toast.error("Please check your email.");
    } else {
      toast.success("Reset password email sent. Please check your email.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Enter your email"
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
      </div>
      <Button
        type="submit"
        className="w-full mt-6 bg-gray-800 disabled:bg-gray-400"
        disabled={isSubmitting || isSubmitted || !isValid}
      >
        Send reset password link
      </Button>
    </form>
  );
}
