"use client";

import useAttendeeStore from "@/lib/store/attendee";
import useCartStore from "@/lib/store/cart";
import { getCurrencyInWon } from "@/utils/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function TicketSummary({ event_id }: { event_id: string }) {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cleanCart = useCartStore((state) => state.cleanCart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const attendees = useAttendeeStore((state) => state.attendees);
  const cleanAttendees = useAttendeeStore((state) => state.cleanAttendees);
  useEffect(() => {
    if (event_id && cart && event_id !== attendees[0]?.event_id) {
      cleanAttendees();
    }

    if (cart.length > 0 && cart[0]?.event_id !== event_id) {
      cleanCart();
    }
    // console.log("cart", cart);
  }, [event_id, cart]);

  const goToOrder = () => {
    const order_at = Date.now();
    router.push(`/order?id=${event_id}&order_at=${order_at}`);
  };

  const OrderSum = () => (
    <Card className="mt-6 lg:mt-0">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm lg:text-base text-gray-700">
            주문 요약
          </CardTitle>
          <div
            className="text-xs font-semibold text-gray-600 cursor-pointer"
            onClick={cleanCart}
          >
            비우기
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-xs lg:text-sm text-gray-700">
        {cart.map((item) => (
          <div
            key={item.product_id}
            className="flex items-center justify-between mt-2 -mr-2"
          >
            <div>{item.product_title}</div>
            <div className="flex items-center justify-end">
              <span className="mr-1">{getCurrencyInWon(item.price)}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item)}
                className="h-6 w-6 p-0"
                aria-label={`Remove ${item.product_title}`}
              >
                <X className="h-4 w-4 pt-0.5" />
              </Button>
            </div>
          </div>
        ))}
        <Separator className="my-4" />
        <div className="flex justify-between items-center text-sm lg:text-base font-semibold pt-8 text-gray-700">
          <span>주문 합계</span>
          <span>{getCurrencyInWon(totalPrice)}</span>
        </div>

        <Button
          className="w-full mt-5 text-xs lg:text-sm bg-pink-700"
          onClick={goToOrder}
        >
          <ShoppingCart className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
          주문하러 가기
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className={`lg:flex-grow ${cart.length > 0 ? "block" : "invisible"}`}>
      <div className="hidden lg:block sticky top-24">
        <OrderSum />
      </div>
      <div className="fixed bottom-2 right-2 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="text-xs">
              <ShoppingCart className="mr-1 h-3 w-3" />
              View Order ({getCurrencyInWon(totalPrice)})
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-base lg:text-lg">
                Order Summary
              </SheetTitle>
            </SheetHeader>
            <OrderSum />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
