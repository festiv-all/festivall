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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPasswordForm({
  user,
}: {
  user: User | undefined;
}) {
  const router = useRouter();

  if (user) {
    router.push("/");
  }

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    const { result } = await forgotPassword(formData);
    console.log("loginresult", result);
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
        disabled={isSubmitting || !isValid}
      >
        Reset password
      </Button>
    </form>
  );
}
