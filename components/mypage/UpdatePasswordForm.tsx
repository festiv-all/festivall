"use client";

import { updatePassword } from "@/app/login/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UpdatePasswordFormData,
  updatePasswordSchema,
} from "@/lib/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "@supabase/supabase-js";
import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CardHeader, CardTitle } from "../ui/card";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { supabaseBrowser } from "@/utils/supabase/client";

export default function UpdatePasswordForm({
  setIsPasswordOpen,
}: {
  setIsPasswordOpen: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: yupResolver(updatePasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: UpdatePasswordFormData) => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.updateUser({
      data: {
        password: formData?.newPassword,
      },
    });
    console.log("result", data);
    if (error) {
      toast.error("Failed to update password");
    } else {
      toast.success("Password updated. Please login again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="currentPassword">Current Password</Label>

          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder=""
            className=""
            required
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            {...register("newPassword")}
            type="password"
            placeholder=""
            className=""
            required
          />
          <p className="text-xs text-gray-500">
            Lower/upper case, number and special character should be included in
            8-30 characters
          </p>
          {errors.confirmNewPassword && (
            <span className="text-red-500 text-xs">
              {errors.newPassword?.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
          <Input
            id="confirmNewPassword"
            {...register("confirmNewPassword")}
            type="password"
            placeholder=""
            className=""
            required
          />
          {errors.confirmNewPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmNewPassword.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsPasswordOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="purple"
          className=""
          disabled={isSubmitting || !isValid}
        >
          Update password
        </Button>
      </div>
    </form>
  );
}
