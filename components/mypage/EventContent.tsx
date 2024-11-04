import { CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

// Mock data
const mockUserData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  socialLogins: ["google", "github"],
  tickets: [
    {
      id: 1,
      eventName: "Summer Music Class",
      ticketType: "1 week pass",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      eventName: "Jazz Night Class",
      ticketType: "3 week pass",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      eventName: "Rock Class",
      ticketType: "2 week pass",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
  ],
  bookmarkedEvents: [
    {
      id: 1,
      name: "Electronic Dance Class",
      date: "August 15, 2024",
      venue: "Central Park",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      name: "Classical Symphony Night",
      date: "September 20, 2024",
      venue: "Royal Hall",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      name: "Pop Music Class",
      date: "October 5, 2024",
      venue: "City",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
  ],
};

export default function EventContent() {
  return (
    <CardContent className="p-0">
      <div className="space-y-2.5">
        {mockUserData.bookmarkedEvents.map((event, idx) => (
          <div
            key={event.id}
            className={`flex items-center space-x-4 p-2.5 ${
              idx === 0 ? "" : "border-t border-gray-200"
            } hover:bg-accent transition-colors`}
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={event.imageUrl}
                alt={event.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-s font-semibold">{event.name}</h3>
              <p className="text-xs text-muted-foreground">{event.date}</p>
              <p className="text-xs text-muted-foreground">{event.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
}
