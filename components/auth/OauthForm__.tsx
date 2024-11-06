"use client";

import { privacy } from "@/app/docs/privacy/privacy";
import { terms } from "@/app/docs/terms/terms";
import { Button } from "@/components/ui/button";
import { OauthUserFormData, oauthUserSchema } from "@/lib/schema/userSchema";
import { supabaseBrowser } from "@/utils/supabase/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

export default function OauthForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { isValid, isSubmitting, errors },
  } = useForm<OauthUserFormData>({
    resolver: yupResolver(oauthUserSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: OauthUserFormData) => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.updateUser({
      data: {
        isOver14: formData?.isOver14,
        termsAgreement: formData?.termsAgreement,
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
  );
}
