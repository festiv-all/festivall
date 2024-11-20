// src/app/api/payment/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cartProduct } from "@/lib/types/cartProduct";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { cart, attendees, totalPrice, eventTitle, eventId, userId } =
    await req.json();
  await supabase.rpc("begin_tx");

  try {
    // Validate request data
    if (
      !cart ||
      !attendees ||
      !totalPrice ||
      !eventTitle ||
      !eventId ||
      !userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate cart items match ticket details
    if (cart.length !== attendees.length) {
      return NextResponse.json(
        { error: "Attendees must match cart items" },
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
        p_event_id: eventId,
        p_total: totalPrice,
        p_user_id: userId,
      }
    );

    if (orderError) {
      console.error("api/payment - orderError", orderError);
      await supabase.rpc("rollback_tx");
      return NextResponse.json({ error: orderError.message }, { status: 400 });
    } else {
      await supabase.rpc("begin_tx");
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
    await supabase.rpc("rollback_tx");
    console.error("Payment initialization failed:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
