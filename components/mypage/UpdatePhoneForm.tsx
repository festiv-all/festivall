"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseBrowser } from "@/utils/supabase/client";
import { useState } from "react";
import { Label } from "../ui/label";
import { PhoneInput } from "../ui/phone-input";
import { useUser } from "@/lib/store/user";
import toast from "react-hot-toast";

export default function UpdatePhoneForm({
  setIsPhoneOpen,
  currentPhoneNumber,
}: {
  setIsPhoneOpen: (open: boolean) => void;
  currentPhoneNumber: string;
}) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = () => {
    // Handle sending verification code logic here
    if (phoneNumber === currentPhoneNumber) {
      toast.error("It's same as current phone number.");
      return;
    }
    setIsCodeSent(true);
    setCountdown(300);
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePhoneVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle phone verification logic here
    setIsPhoneOpen(false);
    // Reset form
    setVerificationCode("");
    setIsCodeSent(false);

    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.updateUser({
      data: {
        phone: phoneNumber,
        phone_verified: true,
      },
    });
    if (error) {
      toast.error("Please try again.");
    } else {
      toast.success("Phone number verified successfully.");
      useUser.setState({ user: data?.user });
    }
  };

  return (
    <form onSubmit={handlePhoneVerification} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <div className="flex gap-2 w-full">
          <PhoneInput
            id="phoneNumber"
            type="tel"
            className="flex-1"
            onChange={(value) => {
              setPhoneNumber(value);
            }}
            value={phoneNumber}
            international
            defaultCountry="KR"
          />
          <Button
            className="text-xs"
            type="button"
            variant="purple"
            onClick={handleSendCode}
            disabled={
              (isCodeSent && countdown > 0) ||
              !phoneNumber ||
              phoneNumber.length < 8
            }
          >
            {isCodeSent && countdown > 0
              ? `Resend (${countdown}s)`
              : isCodeSent
              ? "Resend Code"
              : "Send Code"}
          </Button>
        </div>
      </div>
      {isCodeSent && (
        <div className="space-y-2">
          <Label htmlFor="verificationCode">Verification Code</Label>
          <Input
            id="verificationCode"
            type="number"
            min={0}
            max={999999}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            maxLength={6}
            required
          />
        </div>
      )}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsPhoneOpen(false)}
        >
          Cancel
        </Button>
        {isCodeSent && (
          <Button
            type="submit"
            variant="purple"
            disabled={
              !isCodeSent || !verificationCode || verificationCode.length != 6
            }
          >
            Verify
          </Button>
        )}
      </div>
    </form>
  );
}
