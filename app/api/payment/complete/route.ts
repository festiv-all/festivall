// src/app/api/payment/complete/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Attendee } from "@/lib/types/attendee";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { paymentId, orderId, attendees } = await req.json();
  console.log("api/payment/complete - attendees", attendees);

  try {
    // 1. Verify payment with PortOne API
    const paymentResponse = await fetch(
      `https://api.portone.io/payments/${paymentId}`,
      {
        headers: {
          Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
        },
      }
    );
    console.log("api/payment/complete - paymentResponse", paymentResponse);

    if (!paymentResponse.ok) {
      throw new Error(
        `Payment verification failed: ${await paymentResponse.text()}`
      );
    }

    const payment = await paymentResponse.json();
    console.log("api/payment/complete - payment", payment);

    // 2. Get order details from Supabase
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();
    console.log("api/payment/complete - orderData", orderData);

    if (orderError || !orderData) {
      throw new Error(`Order not found: ${orderId}`);
    }

    // 3. Verify payment amount
    if (orderData.total === payment.amount.total) {
      switch (payment.status) {
        case "PAID": {
          // Confirm order with payment details
          const { error: confirmError } = await supabase.rpc("confirm_order", {
            p_order_id: orderId,
            p_event_id: orderData.event_id,
            p_user_id: orderData.user_id,
            p_method: payment.method.type,
            p_payment_id: paymentId,
            p_amount: Number(payment.amount.total),
            p_card_type:
              payment.method.type === "PaymentMethodCard"
                ? payment.method.card.ownerType
                : "",
            p_card_name:
              payment.method.type === "PaymentMethodCard"
                ? payment.method.card.name
                : "",
            p_card_number:
              payment.method.type === "PaymentMethodCard"
                ? payment.method.card.number
                : "",
            p_attendee_infos: attendees.map((attendee: Attendee) => ({
              product_id: attendee.product_id,
              price: Number(attendee.price),
              attendee_name: attendee.name,
              attendee_email: attendee.email,
              attendee_phone: attendee.phone,
              attendee_city: attendee.city,
            })),
            p_response: payment,
          });

          if (confirmError) {
            throw new Error(
              `Order confirmation failed: ${confirmError.message}`
            );
          }

          return NextResponse.json({
            success: true,
            status: "paid",
            orderId,
          });
        }

        case "VIRTUAL_ACCOUNT_ISSUED": {
          // Update order status for virtual account
          const { error: updateError } = await supabase
            .from("orders")
            .update({
              status: "pending_virtual_account",
              payment_details: {
                payment_id: paymentId,
                status: payment.status,
                virtual_account: payment.virtual_account,
                due_date: payment.due_date,
              },
            })
            .eq("id", orderId);

          if (updateError) {
            throw new Error(`Order update failed: ${updateError.message}`);
          }

          return NextResponse.json({
            success: true,
            status: "virtual_account_issued",
            orderId,
            virtualAccount: payment.virtual_account,
          });
        }

        default:
          throw new Error(`Unexpected payment status: ${payment.status}`);
      }
    } else {
      // Payment amount mismatch - cancel order and payment
      await supabase.rpc("cancel_order", {
        p_order_id: orderId,
        p_reason: "Payment amount mismatch",
      });

      return NextResponse.json(
        { error: "Payment amount mismatch" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment completion failed:", error);

    // Cancel order if it exists
    if (orderId) {
      try {
        await supabase.rpc("cancel_order", {
          p_order_id: orderId,
          p_reason: error instanceof Error ? error.message : "Unknown error",
        });
      } catch (cancelError) {
        console.error("Order cancellation failed:", cancelError);
      }
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Payment completion failed",
      },
      { status: 500 }
    );
  }
}
