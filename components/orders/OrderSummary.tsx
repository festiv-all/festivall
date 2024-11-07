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
// import * as PortOne from "@portone/browser-sdk/v2";
// import { v4 as uuidv4 } from "uuid";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";

export default function OrderSummary({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) {
  // const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  // const event_title = useCartStore((state) => state.event_title);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const attendees = useAttendeeStore((state) => state.attendees);
  const removeAttendee = useAttendeeStore((state) => state.removeAttendee);
  // const paymentId = uuidv4(); // 임시 paymentId 생성
  // const orderId = uuidv4(); // 임시 orderId 생성

  useEffect(() => {
    const productIds = cart.map((a) => a.product_id);
    const attendeesToRemove = [];
    attendees.forEach((a) => {
      if (!productIds.includes(a.product_id)) {
        attendeesToRemove.push(a);
        removeAttendee(a);
      }
    });
  }, [cart]);

  // // 결제 및 주문 처리 함수
  // const processPaymentAndOrder = async (orderData) => {
  //   try {
  //     // 1. 재고 확인
  //     const stockCheckResponse = await checkStockAvailability(
  //       orderData.order_items_input
  //     );
  //     if (!stockCheckResponse.success) {
  //       console.error("재고가 부족합니다:", stockCheckResponse.error);
  //       return { success: false, message: "재고가 부족합니다." };
  //     }

  //     // 2. PortOne 결제 요청
  //     const paymentId = uuidv4(); // 임시 paymentId 생성
  //     const orderId = uuidv4(); // 임시 orderId 생성

  //     const paymentResponse = await PortOne.requestPayment({
  //       // Store ID 설정
  //       storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
  //       // 채널 키 설정
  //       channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
  //       paymentId,
  //       orderName: `[${event_title.slice(0, 14)}${
  //         event_title.length > 14 ? ".." : ""
  //       }] ${cart[0].product_title} & ${
  //         cart.length > 1 ? cart.length - 1 + " more" : ""
  //       }`,
  //       totalAmount: totalPrice,
  //       currency: "CURRENCY_KRW",
  //       payMethod: "CARD",
  //       redirectUrl: `http://localhost:3000/order/result/${orderId}`,
  //     });

  //     if (paymentResponse?.code != null) {
  //       console.error("결제 오류:", paymentResponse?.message);
  //       toast.error("Payment request failed. Please try again.");
  //       return { success: false, message: "결제 오류가 발생했습니다." };
  //     }

  //     // 3. 결제가 완료된 경우 Supabase RPC 호출
  //     const rpcResponse = await supabase.rpc("process_order", {
  //       order_data: {
  //         order_id: orderId,
  //         order_items_input: orderData.order_items_input,
  //       },
  //       payment_id: paymentId,
  //     });

  //     if (rpcResponse.error) {
  //       console.error("주문 처리 오류:", rpcResponse.error.message);
  //       return { success: false, message: "주문 처리 중 오류가 발생했습니다." };
  //     }

  //     console.log("주문이 성공적으로 처리되었습니다:", rpcResponse.data);
  //     return { success: true, message: "주문이 완료되었습니다." };
  //   } catch (error) {
  //     console.error("결제 및 주문 처리 중 오류:", error.message);
  //     return {
  //       success: false,
  //       message: "결제 및 주문 처리 중 오류가 발생했습니다.",
  //     };
  //   }
  // };

  // // 재고 확인 함수
  // const checkStockAvailability = async (orderItems) => {
  //   try {
  //     const { data, error } = await supabase.rpc("check_stock", {
  //       order_items: orderItems,
  //     });
  //     if (error) throw error;

  //     return { success: data.is_available, error: null };
  //   } catch (error) {
  //     console.error("재고 확인 중 오류:", error.message);
  //     return { success: false, error: error.message };
  //   }
  // };

  // const requestPayment = async () => {
  //   const response = await PortOne.requestPayment({
  //     // Store ID 설정
  //     storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
  //     // 채널 키 설정
  //     channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
  //     paymentId,
  //     orderName: `[${event_title.slice(0, 14)}${
  //       event_title.length > 14 ? ".." : ""
  //     }] ${cart[0].product_title} & ${
  //       cart.length > 1 ? cart.length - 1 + " more" : ""
  //     }`,
  //     totalAmount: totalPrice,
  //     currency: "CURRENCY_KRW",
  //     payMethod: "CARD",
  //     redirectUrl: `http://localhost:3000/order/result/${orderId}`,
  //   });

  //   if (response?.code != null) {
  //     // 오류 발생
  //     return toast.error("Payment request failed. Please try again.");
  //   } else {
  //     router.replace(`/order/result/${orderId}`);
  //   }
  //   // console.log("response", response);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    toast.success("Payment function is being developed.");
    // requestPayment();
    setLoading(false);
    // router.push("/order-payment");
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
            onClick={handleSubmit}
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
