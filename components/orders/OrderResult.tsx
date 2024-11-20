"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useAttendeeStore from "@/lib/store/attendee";
import useCartStore from "@/lib/store/cart";
import { Order, OrderPayment } from "@/lib/types";
import { getCurrencyInWon } from "@/utils/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function OrderResult({ order }: { order: Order | null }) {
  const cleanAttendees = useAttendeeStore((state) => state.cleanAttendees);
  const cleanCart = useCartStore((state) => state.cleanCart);

  useEffect(() => {
    cleanAttendees();
    cleanCart();
  }, []);

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
          <Check className="h-6 w-6 text-purple-600" />
        </div>
        <CardTitle className="text-lg font-bold">Order Confirmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 mt-8">
        <div className="flex gap-2">
          <div className="text-base font-semibold mb-2">Order Number</div>
          <p className="text-base">{order?.id}</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="order-details">
            <AccordionTrigger className="py-2">
              <div className="flex items-center space-x-4 w-full">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={order?.events?.image_url || ""}
                    alt={order?.events?.title || ""}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow text-left">
                  <div className="font-semibold text-base">
                    {order?.events?.title} ({order?.order_items?.length} items)
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {order?.order_items?.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between py-2">
                    <span>
                      {item.products.title} x {item.quantity}
                    </span>
                    <span>{getCurrencyInWon(item.price || 0)}</span>
                  </div>
                  {item.attendees.map((attendee) => (
                    <div
                      className="pl-4 text-sm text-gray-600"
                      key={attendee.id}
                    >
                      <p>Name: {attendee.attendee_name}</p>
                      <p>Email: {attendee.attendee_email}</p>
                    </div>
                  ))}
                  {index < order?.order_items?.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
              <div className="flex justify-between py-2 font-bold">
                <span>Total</span>
                <span>{getCurrencyInWon(order?.total || 0)}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Button className="w-full bg-purple-200 text-purple-800 hover:bg-purple-300">
          See Order Details
        </Button>
      </CardFooter>
    </Card>
  );
}
