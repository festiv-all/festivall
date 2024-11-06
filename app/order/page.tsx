import Header from "@/components/header/Header";
import OrderContent from "@/components/orders/OrderContent";

export default function OrderPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <div className="px-4 py-8">
        <OrderContent />
      </div>
    </div>
  );
}
