"use client";

import { privacy } from "@/app/docs/privacy/privacy";
import { terms } from "@/app/docs/terms/terms";
import { signup } from "@/app/(auth)/login/authActions";
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
import { UserFormData, userSchema } from "@/lib/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    trigger,
    formState: { isValid, isSubmitting, errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    mode: "onChange",
  });
  const router = useRouter();

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setValue("email", "bibleshim@gmail.com", { shouldValidate: false });
      setValue("name", "test", { shouldValidate: false });
      setValue("password", "Test11!!", { shouldValidate: false });
      setValue("confirmPassword", "Test11!!", { shouldValidate: false });
      setValue("isOver14", false, { shouldValidate: false });
      setValue("termsAgreement", false, { shouldValidate: false });
    } else {
      setValue("isOver14", false, { shouldValidate: true });
      setValue("termsAgreement", false, { shouldValidate: true });
    }
  }, []);

  const onSubmit = async (data: UserFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    const { result } = await signup(formData);
    if (result?.error) {
      setError("root", { type: "manual", message: "Sign up failed" });
      toast.error("Sign up failed");
    } else if (result?.data?.user?.identities?.length === 0) {
      toast.error("Email already in use");
    } else {
      toast.success(
        "Sign up successful. Please check your email for verification."
      );
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
                placeholder="example@email.com"
                {...register("email")}
                className="pl-10"
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

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
                className="pl-10"
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...register("confirmPassword")}
                className="pl-10"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
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
          disabled={isSubmitting || !isValid}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
