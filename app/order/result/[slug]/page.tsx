import Header from "@/components/header/Header";
import OrderResult from "@/components/orders/OrderResult";
import { Order, OrderPayment } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export default async function OrderConfirmation({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();
  const { data: order } = await supabase
    .from("orders")
    .select("*, events(*), order_items(*, products(*), attendees(*))")
    .eq("id", params.slug)
    .single();
  console.log("order", order?.order_items);
  const { data: payment } = await supabase
    .from("order_payments")
    .select("*")
    .eq("order_id", params.slug)
    .single();
  console.log("payment", payment);

  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="mt-12 px-4 py-8">
        {order && payment ? (
          <OrderResult
            order={order as Order}
            payment={payment as OrderPayment}
          />
        ) : (
          <div>Order not found</div>
        )}
      </div>
    </div>
  );
}
