import Header from "@/components/header/Header";
import OrderContent from "@/components/orders/OrderContent";
import { Suspense } from "react";

export default function OrderPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="px-4 py-8">
        <Suspense
          fallback={
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          }
        >
          <OrderContent />
        </Suspense>
      </div>
    </div>
  );
}
