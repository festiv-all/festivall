import {
  ResendEmailFormData,
  resendEmailFormSchema,
} from "@/lib/schema/userSchema";
import { supabaseBrowser } from "@/utils/supabase/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function ResendConfirmMailForm({
  isEmailOpen,
  setIsEmailOpen,
  email,
}: {
  isEmailOpen: boolean;
  setIsEmailOpen: (open: boolean) => void;
  email: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<ResendEmailFormData>({
    resolver: yupResolver(resendEmailFormSchema),
    mode: "onChange",
    defaultValues: { email },
  });

  const resendEmail = async () => {
    const supabase = supabaseBrowser();
    const { data: result, error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    console.log("handleResendEmail - result", result);
    console.log("handleResendEmail - error", error);
    setIsEmailOpen(false);
    toast.success("Confirmation email sent. Check your email please.");
  };

  return (
    <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
      <DialogContent className="rounded-md w-[95vw] md:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Email not confirmed</DialogTitle>
          <DialogDescription>
            Do you want to resend the confirmation email?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(resendEmail)}>
          <Input
            {...register("email")}
            type="email"
            defaultValue={email}
            disabled
          />
          <Button
            type="submit"
            className="w-full mt-2 bg-gray-800 disabled:bg-gray-400"
            disabled={isSubmitting || isSubmitted}
          >
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
