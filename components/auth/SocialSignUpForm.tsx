"use client";

import { privacy } from "@/app/docs/privacy/privacy";
import { terms } from "@/app/docs/terms/terms";
import { socialSignUp } from "@/app/login/authActions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SocialUserFormData, socialUserSchema } from "@/lib/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const SocialSignUpForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const provider = searchParams.get("provider") || "";

  useEffect(() => {
    if (!email || !provider) {
      toast.error("Invalid request");
    }
  }, [email, provider]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { isValid, isSubmitting, isSubmitted, errors },
  } = useForm<SocialUserFormData>({
    resolver: yupResolver(socialUserSchema),
    mode: "onChange",
  });

  React.useEffect(() => {
    setValue("email", email, { shouldValidate: false });
    setValue("isOver14", false);
    setValue("termsAgreement", false);
  }, [setValue, email]);

  const onSubmit = async (data: SocialUserFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    const { result } = await socialSignUp(formData);
    if (result?.error) {
      toast.error("Sign up failed");
    } else {
      toast.success("Sign up successful. Move to main page now.");
      router.replace("/");
    }
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <pre>{isValid ? "valid" : "invalid"}</pre> */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                {...register("email")}
                className="pl-10 disabled:bg-gray-100"
                disabled={true}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                placeholder="Gildong Hong"
                {...register("name")}
                className="pl-10"
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="isOver14"
              checked={watch("isOver14")}
              {...register("isOver14")}
              onCheckedChange={(checked) => {
                setValue("isOver14", !!checked);
                trigger("isOver14");
              }}
            />
            <label
              htmlFor="isOver14"
              className="text-s font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I am 14 years old or older
            </label>
          </div>
          {errors.isOver14 && (
            <span className="text-red-500 text-xs">
              {errors.isOver14.message}
            </span>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="termsAgreement"
              checked={watch("termsAgreement")}
              {...register("termsAgreement")}
              onCheckedChange={(checked) => {
                setValue("termsAgreement", !!checked);
                trigger("termsAgreement");
              }}
            />
            <label
              htmlFor="terms"
              className="text-s font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Dialog>
                <DialogTrigger className="text-blue-500 hover:underline">
                  Terms of Policy
                </DialogTrigger>
                <DialogContent className="max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>이용약관</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[400px] w-full pr-4">
                    <DialogDescription>
                      <ReactMarkdown className="markdown prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
                        {terms}
                      </ReactMarkdown>
                    </DialogDescription>
                  </ScrollArea>
                </DialogContent>
              </Dialog>{" "}
              and{" "}
              <Dialog>
                <DialogTrigger className="text-blue-500 hover:underline">
                  Privacy Policy
                </DialogTrigger>
                <DialogContent className="max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>개인정보처리방침</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[400px] w-full pr-4">
                    <DialogDescription>
                      <ReactMarkdown className="markdown prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
                        {privacy}
                      </ReactMarkdown>
                    </DialogDescription>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </label>
          </div>
          {errors.termsAgreement && (
            <span className="text-red-500 text-xs">
              {errors.termsAgreement.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full mt-6 disabled:bg-gray-400"
          disabled={isSubmitting || isSubmitted || !isValid}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SocialSignUpForm;
