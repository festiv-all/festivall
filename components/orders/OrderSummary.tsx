"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAttendeeStore } from "@/lib/store/attendee";
import useCartStore from "@/lib/store/cart";
import { getCurrencyInWon } from "@/utils/utils";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function OrderSummary() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const attendees = useAttendeeStore((state) => state.attendees);
  const removeAttendee = useAttendeeStore((state) => state.removeAttendee);
  const cleanAttendees = useAttendeeStore((state) => state.cleanAttendees);
  useEffect(() => {
    const productIds = cart.map((a) => a.product_id);
    let attendeesToRemove = [];
    attendees.forEach((a) => {
      if (!productIds.includes(a.product_id)) {
        attendeesToRemove.push(a);
        removeAttendee(a);
      }
    });
    if (cart.length === 0) {
      cleanAttendees();
      toast.error("Wrong Access");
      router.push("/");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("attendees", attendees);
    // router.push("/order-payment");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.map((item) => (
          <div
            key={item.product_id}
            className="text-s flex items-center justify-between mt-2 -mr-2"
          >
            <div>{item.product_title}</div>
            <div className="flex items-center justify-end">
              <span className="mr-1">{getCurrencyInWon(item.price)}</span>
            </div>
          </div>
        ))}
        <Separator className="my-4" />
        <div className="flex justify-between items-center text-sm lg:text-base font-semibold pt-8 text-gray-800">
          <span>주문 합계</span>
          <span>{getCurrencyInWon(totalPrice)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full disabled:bg-gray-400"
          // disabled={
          //   attendees.length === 0 ||
          //   attendees.filter((at) => at.name === "").length > 0
          // }
        >
          Continue to Payment
        </Button>
      </CardFooter>
    </Card>
  );
}
