// src/app/api/payment/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cartProduct } from "@/lib/types/cartProduct";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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

    // Validate cart items match ticket details
    if (cart.length !== ticketDetails.length) {
      return NextResponse.json(
        { error: "Ticket details must match cart items" },
        { status: 400 }
      );
    }

    // Create pending order
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

    // Return payment initialization data
    return NextResponse.json({
      success: true,
      orderData: {
        orderId,
        orderName: `[${eventTitle.slice(0, 14)}${
          eventTitle.length > 14 ? ".." : ""
        }] ${cart[0].product_title} ${
          cart.length > 1 ? `& ${cart.length - 1} more` : ""
        }`,
        totalAmount: totalPrice,
      },
    });
  } catch (error) {
    console.error("Payment initialization failed:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
