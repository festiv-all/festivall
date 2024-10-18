import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { eventDatesDisplay } from "@/utils/utils";
import {
  Calendar,
  Facebook,
  Globe,
  Instagram,
  MapPin,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  // const event_title = params.slug.replaceAll("-", " ");
  const { data: event } = await supabase
    .from("events")
    .select("*,organizers(*)")
    .eq("id", params.slug)
    .single();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:pt-12 md:pb-36">
      {event ? (
        <Card className="overflow-hidden">
          {event.image_url && (
            <div className="h-64 relative">
              <Image
                src="/campswingit.jpg"
                alt={event.title}
                className="w-full relative object-cover"
                fill
              />
            </div>
          )}
          <CardContent className="p-6">
            <h1 className="text-md md:text-xl font-bold mb-4 text-gray-800">
              {event.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700">
              <div className="space-y-2">
                <div className="flex items-center text-sm md:text-md">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {eventDatesDisplay(event.date_start, event.date_end)}
                  </span>
                </div>
                <div className="flex items-center text-sm md:text-md">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center text-sm md:text-md">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{event.organizers?.corp_name}</span>
                </div>
              </div>
              <div className="space-y-2 md:space-x-4 md:text-right text-sm md:text-md">
                <div>
                  <a target="_blank" href="https://camp.swingit.kr/">
                    <Button className="w-full md:w-auto" variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      홈페이지 바로가기
                    </Button>
                  </a>
                </div>
                <div>
                  <Link href={`/buy-tickets/${event.id}`}>
                    <Button className="w-full md:w-auto">
                      <Ticket className="w-4 h-4 mr-2" />
                      티켓 구매하기
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="space-y-4">
              <h2 className="text-md md:text-xl font-semibold text-gray-800">
                About the Event
              </h2>
              <p className="text-gray-700 text-sm md:text-md">
                {event.description}
              </p>
            </div>
            <Separator className="my-6" />
            <div>
              <h2 className="text-md md:text-xl font-semibold mb-4 text-gray-800">
                Connect with us
              </h2>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={event.link_facebook || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="sr-only">Facebook</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={event.link_instagram || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-28">
          <div>이벤트 정보가 없습니다.</div>
          <div>주소를 다시 확인해 주세요.</div>
        </div>
      )}
    </div>
  );
}
