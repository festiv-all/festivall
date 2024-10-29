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
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

// Mock data for the order confirmation
const orderConfirmation = {
  orderNumber: "ORD-12345",
  event: {
    name: "Summer Music Festival",
    date: "August 15-17, 2024",
    location: "Sunshine Park, California",
    imageUrl: "/placeholder.svg?height=100&width=200",
  },
  items: [
    {
      name: "VIP Pass",
      quantity: 1,
      price: 150,
      attendee: { name: "John Doe", email: "john@example.com" },
    },
    {
      name: "General Admission",
      quantity: 1,
      price: 75,
      attendee: { name: "Jane Smith", email: "jane@example.com" },
    },
  ],
  total: 225,
};

export default function OrderConfirmation() {
  const cleanAttendees = useAttendeeStore((state) => state.cleanAttendees);
  const cleanCart = useCartStore((state) => state.cleanCart);

  useEffect(() => {
    cleanAttendees();
    cleanCart();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
            <Check className="h-6 w-6 text-pink-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Order Confirmed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 mt-8">
          <div className="flex gap-2">
            <h3 className="font-semibold mb-2">Order Number</h3>
            <p className="text-base">{orderConfirmation.orderNumber}</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="order-details">
              <AccordionTrigger className="py-2">
                <div className="flex items-center space-x-4 w-full">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={orderConfirmation.event.imageUrl}
                      alt={orderConfirmation.event.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow text-left">
                    <div className="font-semibold text-base">
                      {orderConfirmation.event.name} (
                      {orderConfirmation.items.length} items)
                    </div>
                    {/* <p className="text-sm text-pink-600">
                      {orderConfirmation.event.date}
                    </p> */}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {orderConfirmation.items.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between py-2">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <div className="pl-4 text-sm text-gray-600">
                      <p>Attendee: {item.attendee.name}</p>
                      <p>Email: {item.attendee.email}</p>
                    </div>
                    {index < orderConfirmation.items.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
                <div className="flex justify-between py-2 font-bold">
                  <span>Total</span>
                  <span>${orderConfirmation.total.toFixed(2)}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button className="w-full bg-pink-200 text-pink-800 hover:bg-pink-300">
            See Order Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
