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
import { useUser } from "@/lib/store/user";
import { getCurrencyInWon } from "@/utils/utils";
import * as PortOne from "@portone/browser-sdk/v2";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function OrderSummary({
  setIsLoading,
}: {
  setIsLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const eventTitle = useCartStore((state) => state.event_title);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const attendees = useAttendeeStore((state) => state.attendees);
  const removeAttendee = useAttendeeStore((state) => state.removeAttendee);
  const eventId = useCartStore((state) => state.event_id);
  const user = useUser((state) => state.user);
  console.log("order summary user", user);

  useEffect(() => {
    const productIds = cart.map((a) => a.product_id);
    const attendeesToRemove = [];
    attendees.forEach((a) => {
      if (!productIds.includes(a.product_id)) {
        attendeesToRemove.push(a);
        removeAttendee(a);
      }
    });
  }, [attendees, removeAttendee, cart]);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // Step 1: Initialize payment (create order)
      const initResponse = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          attendees,
          totalPrice,
          eventTitle,
          eventId,
          userId: user?.id,
        }),
      });
      console.log("order summary init response", initResponse);

      const initResult = await initResponse.json();
      if (!initResult.success) {
        throw new Error(initResult.error);
      }

      const { orderData } = initResult;

      // Step 2: Request payment through PortOne
      const response = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId: `card-${crypto.randomUUID()}`,
        orderName: orderData.orderName,
        totalAmount: orderData.totalAmount,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
      });
      console.log("order summary response", response);

      if (response?.code !== undefined) {
        throw new Error(response.message);
      }

      // Step 3: Verify payment with our server
      const verifyResponse = await fetch("/api/payment/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: response?.paymentId,
          orderId: orderData.orderId,
          attendees,
        }),
      });

      const verifyResult = await verifyResponse.json();
      if (!verifyResult.success) {
        throw new Error(verifyResult.error);
      }

      // Handle success
      if (verifyResult.status === "paid") {
        router.push(`/order/result/${orderData.orderId}`);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="">
      <div className="sticky top-20">
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
            onClick={handlePayment}
            className="w-full disabled:bg-gray-400 bg-pink-700 text-white hover:bg-pink-500"
            disabled={
              attendees.length === 0 ||
              attendees.filter((at) => at.name === "" || at.city === "")
                .length > 0
            }
          >
            Continue to Payment
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
