import OrderSummary from "@/components/orders/OrderSummary";
import ProductCard from "@/components/products/ProductCard";
import { createClient } from "@/utils/supabase/server";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default async function BuyTicketsPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const title = params.slug.replaceAll("-", " ");
  // const currentDate = new Date().toISOString();
  const { data: event } = await supabase
    .from("events")
    .select("*, products(*, categories(*)), organizers(id, corp_name)")
    .eq("title", title)
    .single();

  const { data: categories } = await supabase
    .from("categories")
    .select("*, events(title), products(*), sub_categories(*, products(*))")
    .eq("events.title", title);

  return (
    <div className="container mx-auto max-w-5xl px-5 py-6 text-xs lg:text-sm">
      {event ? (
        <div>
          <div className="mb-4 lg:mb-6 mt-6 lg:mt-8">
            <div className="h-32 lg:h-64 relative">
              <Image
                src="/campswingit.jpg"
                alt={event.title}
                className="w-full relative object-cover rounded-md"
                fill
              />
            </div>
            <h1 className="text-base lg:text-lg font-bold mb-2 mt-3 text-gray-800">
              {event.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-1">
              <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span>{event.date_start}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span>{event.venue}</span>
            </div>
          </div>

          <div className="lg:flex lg:gap-8 mt-16">
            <div className="lg:flex-grow">
              {categories?.map(
                (cate) =>
                  cate.products.length > 0 && (
                    <div key={cate.title} className="mb-10 lg:mb-16">
                      <h2 className="text-sm lg:text-base font-semibold mb-4 text-gray-800">
                        {cate.title}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cate.products
                          ?.filter((pr) => pr.category_id === cate.id)
                          .map((item) => (
                            <ProductCard key={item.id} product={item} />
                          ))}
                      </div>
                    </div>
                  )
              )}
            </div>

            <OrderSummary />
          </div>
        </div>
      ) : (
        <div className="text-center py-28">
          <div>이벤트 정보가 없습니다.</div>
          <div>주소를 다시 확인해 주세요.</div>
        </div>
      )}
    </div>
  );
}
