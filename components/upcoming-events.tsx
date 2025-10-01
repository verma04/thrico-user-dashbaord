import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"; // Adjust path as needed

const events = [
  {
    title: "Tech Networking Mixer",
    date: "Dec 15, 2024",
    time: "6:00 PM",
    location: "San Francisco, CA",
    attendees: 45,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Startup Pitch Night",
    date: "Dec 18, 2024",
    time: "7:00 PM",
    location: "New York, NY",
    attendees: 32,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Design Workshop",
    date: "Dec 22, 2024",
    time: "2:00 PM",
    location: "Austin, TX",
    attendees: 28,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Design Workshop",
    date: "Dec 22, 2024",
    time: "2:00 PM",
    location: "Austin, TX",
    attendees: 28,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Design Workshop",
    date: "Dec 22, 2024",
    time: "2:00 PM",
    location: "Austin, TX",
    attendees: 28,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function UpcomingEvents() {
  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="body-text text-gray-600 max-w-2xl mx-auto">
            Don't miss out on exciting networking opportunities and learning
            experiences
          </p>
        </div>
        <BentoGrid className="max-w-4xl mx-auto">
          {events.map((event, i) => (
            <BentoGridItem
              key={i}
              title={event.title}
              description={
                <div>
                  <div className="flex items-center text-gray-600 space-x-4 mb-2">
                    <span className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {event.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </span>
                    <Badge variant="secondary" className="label-text-small">
                      {event.attendees} attending
                    </Badge>
                  </div>
                </div>
              }
              header={
                <div className="relative h-32 w-full">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              }
              // Optionally add an icon or leave blank
              icon={null}
              className={i === 1 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
