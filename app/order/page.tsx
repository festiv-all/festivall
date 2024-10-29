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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingSpinner } from "@/components/icons/Icons";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
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
    if (cart && noOrder) {
      cleanAttendees();
      toast.error("Wrong Access. No items in cart.");
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

          <OrderSummary setLoading={setLoading} />
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
      {loading && (
        <div className="w-full h-full z-50 fixed top-0 left-0 flex justify-center items-center bg-opacity-30 bg-gray-100">
          <LoadingSpinner className="h-12 w-12 animate-spin mb-36 text-gray-300" />
        </div>
      )}
    </div>
  );
}
