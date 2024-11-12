// src/app/api/payment/route.ts

import { cartProduct } from "@/lib/types/cartProduct";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for admin access
);

export async function POST(req: Request) {
  try {
    const { cart, ticketDetails, totalPrice, eventTitle } = await req.json();

    // Validate request data
    if (!cart || !ticketDetails || !totalPrice || !eventTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Step 1: Create pending order
    const { data: orderId, error: orderError } = await supabase.rpc(
      "process_order",
      {
        p_cart_items: cart.map((item: cartProduct) => ({
          product_id: item.product_id,
          quantity: 1,
        })),
      }
    );

    if (orderError) {
      return NextResponse.json({ error: orderError.message }, { status: 400 });
    }

    // Step 2: Generate payment info for client
    const paymentInfo = {
      orderId,
      amount: totalPrice,
      orderName: `[${eventTitle.slice(0, 14)}${
        eventTitle.length > 14 ? ".." : ""
      }] ${cart[0].product_title} ${
        cart.length > 1 ? `& ${cart.length - 1} more` : ""
      }`,
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/confirm`,
      failUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
      // Store ticket details in session or temporary storage
      paymentKey: process.env.PORTONE_API_KEY,
    };

    // Store ticket details temporarily (you might want to use Redis or similar)
    await supabase.from("temporary_ticket_details").insert({
      order_id: orderId,
      ticket_details: ticketDetails,
      expires_at: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes expiry
    });

    return NextResponse.json({ paymentInfo });
  } catch (error) {
    console.error("Payment initialization failed:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
