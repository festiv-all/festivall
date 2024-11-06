"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UpdateUserFormData, updateUserSchema } from "@/lib/schema/userSchema";
import { useUser } from "@/lib/store/user";
import { supabaseBrowser } from "@/utils/supabase/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { User } from "@supabase/supabase-js";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Icons } from "../icons/Icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdatePhoneForm from "./UpdatePhoneForm";

export default function ProfileContent({ user }: { user: User | undefined }) {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: {},
  } = useForm<UpdateUserFormData>({
    resolver: yupResolver(updateUserSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("name", user?.user_metadata.name || "");
    setValue("email", user?.user_metadata.email || "");
    setValue("phone", user?.user_metadata.phone || "");
  }, [user, setValue]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handdleDeleteUser = async () => {
    const supabase = supabaseBrowser();

    if (
      window.confirm(
        "Do you really want to delete your account? Your all activities and data in Festivall will be deleted."
      )
    ) {
      try {
        const { data, error } = await supabase.rpc("delete_user");
        console.log(data, error);
        if (!error) {
          toast.success("Your account has been deleted.");
          router.push("/");
          router.refresh();
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Please try again.");
      }
    }
  };

  const changeUserName = async (email: string, name: string) => {
    if (email === "" || name === "") {
      toast.error("Unknown errors. Please try again.");
    } else {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: name,
        },
      });
      if (error) {
        toast.error("Please try again.");
      } else {
        toast.success("Name changed successfully.");
        useUser.setState({ user: data.user });
      }
    }
  };

  return (
    <>
      <Card className="mb-8">
        <CardContent className="pt-6 pb-10">
          {user ? (
            <form onSubmit={onSubmit} className="space-y-6 text-xs">
              <div className="space-y-2">
                <Label>Name</Label>
                <div className="flex gap-4">
                  <Input id="current_name" {...register("name")} />
                  <Button
                    className="text-xs"
                    variant="purple"
                    disabled={
                      watch("name") === "" ||
                      watch("name") === user?.user_metadata.name
                    }
                    onClick={() => {
                      changeUserName(
                        user?.user_metadata.email || "",
                        getValues("name") || ""
                      );
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="flex gap-4 items-center relative">
                  <Input
                    id="email"
                    className="pl-9"
                    {...register("email")}
                    disabled={true}
                    readOnly
                  />
                  <div className="absolute left-0">
                    {user?.app_metadata.provider === "email" && (
                      <Mail className="h-4 w-4 text-gray-400 ml-3" />
                    )}
                    {user?.app_metadata.provider === "google" && (
                      <Icons.google className="h-4 w-4 text-gray-400 ml-3" />
                    )}
                    {user?.app_metadata.provider === "kakao" && (
                      <Icons.kakao className="h-4 w-4 text-gray-50 ml-3" />
                    )}
                    {user?.app_metadata.provider === "facebook" && (
                      <Icons.facebook className="h-4 w-4 text-gray-400 ml-3" />
                    )}
                  </div>
                </div>
              </div>
              {user?.app_metadata.provider === "email" && (
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex gap-4">
                    <Input
                      id="current_password"
                      type="password"
                      {...register("password")}
                      value="********"
                      readOnly
                      disabled
                    />
                    <Dialog
                      open={isPasswordOpen}
                      onOpenChange={setIsPasswordOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="text-xs" variant="purple">
                          Change
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-md w-[95vw] md:max-w-sm">
                        <VisuallyHidden.Root asChild>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Please enter your current password and new
                              password
                            </DialogDescription>
                          </DialogHeader>
                        </VisuallyHidden.Root>
                        <UpdatePasswordForm
                          setIsPasswordOpen={setIsPasswordOpen}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="flex gap-4">
                  <Input
                    id="phone"
                    value={user?.user_metadata.phone || ""}
                    {...register("phone")}
                    placeholder="Not verified"
                    disabled
                    readOnly
                  />
                  <Dialog open={isPhoneOpen} onOpenChange={setIsPhoneOpen}>
                    <DialogTrigger asChild>
                      <Button className="text-xs" variant="purple">
                        {user?.user_metadata.phone ? "Change" : "Verify"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-md w-[95vw] md:max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="text-base">
                          Verify Phone Number
                        </DialogTitle>
                        <DialogDescription>
                          We&apos;ll send you a verification code via SMS
                        </DialogDescription>
                      </DialogHeader>
                      <UpdatePhoneForm
                        setIsPhoneOpen={setIsPhoneOpen}
                        currentPhoneNumber={user?.user_metadata.phone || ""}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-[100px]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-[100px]" />
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      {user && (
        <Button
          className="text-xs text-gray-600"
          variant="secondary"
          onClick={handdleDeleteUser}
        >
          Delete your account
        </Button>
      )}
    </>
  );
}
