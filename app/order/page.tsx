"use client";

import AttendeeForm from "@/components/orders/AttendeeForm";
import OrderSummary from "@/components/orders/OrderSummary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAttendeeStore from "@/lib/store/attendee";
import useCartStore from "@/lib/store/cart";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const event_title = useCartStore((state) => state.event_title);
  const cart = useCartStore((state) => state.cart);
  const cleanAttendees = useAttendeeStore((state) => state.cleanAttendees);
  const noOrder =
    cart.length === 0 &&
    !searchParams.get("id") &&
    !searchParams.get("order_at");

  useEffect(() => {
    if (noOrder) {
      cleanAttendees();
      toast.error("Wrong Access");
      router.push("/");
    }
  }, [searchParams, cart]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {!noOrder ? (
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Fill Attendee Information</CardTitle>
              <CardDescription>{event_title}</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendeeForm />
            </CardContent>
          </Card>

          <OrderSummary />
        </div>
      ) : (
        <div className="min-h-[80vh] mt-24">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-bold text-center text-gray-800">
              No items in cart
            </CardTitle>
          </CardHeader>
        </div>
      )}
    </div>
  );
}
