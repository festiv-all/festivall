// src/app/api/payment/complete/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { paymentId, orderId } = await req.json();

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

    if (!paymentResponse.ok) {
      throw new Error(
        `Payment verification failed: ${await paymentResponse.text()}`
      );
    }

    const payment = await paymentResponse.json();

    // 2. Get order details from Supabase
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !orderData) {
      throw new Error(`Order not found: ${orderId}`);
    }

    // 3. Verify payment amount
    if (orderData.total_amount === payment.amount.total) {
      switch (payment.status) {
        case "PAID": {
          // Confirm order with payment details
          const { error: confirmError } = await supabase.rpc("confirm_order", {
            p_order_id: orderId,
            p_payment_method: payment.method,
            p_amount: payment.amount.total,
            p_payment_details: {
              payment_id: paymentId,
              status: payment.status,
              method: payment.method,
              paid_at: payment.paid_at,
              receipt_url: payment.receipt_url,
              // Add any other payment details you want to store
            },
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
