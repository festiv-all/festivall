import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Music,
  Search,
  Theater,
  Ticket,
  Trophy,
  Utensils,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  // const [searchQuery, setSearchQuery] = useState("");
  const hotEvents = [
    {
      id: 1,
      icon: "CSI",
      name: "Camp Swing It 2025",
      date: "2025년 4월 4-7일",
      image: "/placeholder.svg?height=400&width=600",
      link: "/event/Camp-Swing-It-2025",
    },
    {
      id: 2,
      icon: "new",
      name: "새로운 이벤트가 기다리고 있습니다.",
      date: "2024년",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      id: 3,
      icon: "new",
      name: "새로운 이벤트가 기다리고 있습니다.",
      date: "2025년",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  ];

  const genres = [
    { icon: <Music className="w-4 h-4" />, label: "댄스" },
    { icon: <Theater className="w-4 h-4" />, label: "공연" },
    { icon: <Trophy className="w-4 h-4" />, label: "스포츠" },
    { icon: <Utensils className="w-4 h-4" />, label: "푸드" },
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        <section className="text-center">
          <div className="text-xl font-bold text-gray-800 mb-6">
            내 주변 신나는 이벤트를 한번에
          </div>
          {/* <p className="text-2xl text-gray-600 mb-12">
            Find and book tickets for the hottest festivals and events!
          </p> */}
          {/* <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for events, artists, or venues"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full text-sm rounded-full shadow-lg bg-white"
              />
            </div>
            <Button className="ml-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-sm shadow-lg transition-all duration-300 hover:shadow-xl">
              검색
            </Button>
          </div> */}
          <div className="flex flex-wrap justify-center gap-6">
            {genres.map((genre, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm text-gray-800 py-3 px-6 bg-white bg-opacity-70 backdrop-blur-sm hover:bg-purple-100 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {genre.icon}
                <span className="ml-2">{genre.label}</span>
              </Badge>
            ))}
          </div>
        </section>

        {/* <section>
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Hot Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {hotEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 rounded-lg"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-56 object-cover"
                />
                <CardContent className="p-6">
                  <h4 className="text-2xl font-semibold mb-3">{event.name}</h4>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {event.date}
                  </p>
                  <Link href="/events">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                      <Ticket className="w-5 h-5 mr-2" />
                      Get Tickets
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        <section>
          <h3 className="text-base font-bold text-gray-800 mb-8">
            예정 이벤트
          </h3>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white bg-opacity-70 backdrop-blur-sm rounded-full p-2">
              <TabsTrigger value="all" className="rounded-full">
                전체
              </TabsTrigger>
              <TabsTrigger value="this-week" className="rounded-full">
                이번주
              </TabsTrigger>
              <TabsTrigger value="this-month" className="rounded-full">
                이번달
              </TabsTrigger>
              <TabsTrigger value="next-month" className="rounded-full">
                다음달
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6">
              {/* Example event items */}
              {hotEvents.map((item) => (
                <Card
                  key={item.name}
                  className="flex items-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-sm">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm text-gray-700 font-semibold mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <Link href={item.link}>
                    <Button
                      variant="outline"
                      className="font-semibold text-gray-700 text-xs ml-4 rounded-full px-6 py-2 hover:bg-purple-100 transition-colors duration-300"
                    >
                      보기
                    </Button>
                  </Link>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="this-week" className="space-y-6">
              {hotEvents.map((item) => (
                <Card
                  key={item.name}
                  className="flex items-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-sm">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm text-gray-700 font-semibold mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <Link href={item.link}>
                    <Button
                      variant="outline"
                      className="font-semibold text-gray-700 text-xs ml-4 rounded-full px-6 py-2 hover:bg-purple-100 transition-colors duration-300"
                    >
                      보기
                    </Button>
                  </Link>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="this-month" className="space-y-6">
              {hotEvents.map((item) => (
                <Card
                  key={item.name}
                  className="flex items-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-sm">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm text-gray-700 font-semibold mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <Link href={item.link}>
                    <Button
                      variant="outline"
                      className="font-semibold text-gray-700 text-xs ml-4 rounded-full px-6 py-2 hover:bg-purple-100 transition-colors duration-300"
                    >
                      보기
                    </Button>
                  </Link>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="next-month" className="space-y-6">
              {hotEvents.map((item) => (
                <Card
                  key={item.name}
                  className="flex items-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-sm">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm text-gray-700 font-semibold mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <Link href={item.link}>
                    <Button
                      variant="outline"
                      className="font-semibold text-gray-700 text-xs ml-4 rounded-full px-6 py-2 hover:bg-purple-100 transition-colors duration-300"
                    >
                      보기
                    </Button>
                  </Link>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
