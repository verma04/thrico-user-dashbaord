"use client"

import { EventsCard } from "./event-card"
import { Button } from "@/components/ui/button"

export interface Event {
  id: string
  title: string
  description: string
  image: string
  date: string
  location: string
  attendees: number
  likes: number
  views: number
  category: string
  creator: {
    name: string
    avatar: string
    role: string
  }
  price: string
  status: string
}

interface EventsListProps {
  currentTab: string
}

const events: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description: "Join us for the premier tech conference of the year, featuring industry leaders, workshops, and networking opportunities.",
    image: "/tech-conference.png",
    date: "Nov 15-18, 2024",
    location: "San Francisco, CA",
    attendees: 1200,
    likes: 340,
    views: 5200,
    category: "Technology",
    creator: {
      name: "Sarah Johnson",
      avatar: "/portrait-young-woman.png",
      role: "Event Organizer"
    },
    price: "Free",
    status: "upcoming"
  },
  {
    id: "2",
    title: "Design Collective Workshop",
    description: "Where creativity meets functionality. Share your designs and get inspired by fellow designers.",
    image: "/collaborative-design-workshop.png",
    date: "Dec 5, 2024",
    location: "New York, NY",
    attendees: 890,
    likes: 256,
    views: 2800,
    category: "Design",
    creator: {
      name: "Alex Rodriguez",
      avatar: "/thoughtful-person.png",
      role: "Design Lead"
    },
    price: "$49",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Startup Pitch Night",
    description: "A community for tech enthusiasts to explore, learn, and connect with like-minded individuals.",
    image: "/startup-pitch.png",
    date: "Jan 20, 2024",
    location: "Austin, TX",
    attendees: 650,
    likes: 189,
    views: 4300,
    category: "Business",
    creator: {
      name: "Michael Chen",
      avatar: "/diverse-group-smiling.png",
      role: "Startup Mentor"
    },
    price: "$25",
    status: "upcoming"
  },
  {
    id: "4",
    title: "Photography Masters",
    description: "Capture moments, share stories, and learn from the best photographers in the industry.",
    image: "/photography-masterclass.png",
    date: "Feb 10, 2024",
    location: "Los Angeles, CA",
    attendees: 780,
    likes: 445,
    views: 2100,
    category: "Photography",
    creator: {
      name: "Emma Wilson",
      avatar: "/diverse-group-meeting.png",
      role: "Professional Photographer"
    },
    price: "$75",
    status: "upcoming"
  }
]

export default events

export function EventsList({ currentTab }: EventsListProps) {
  // Example filter logic, adjust as needed
  const getFilteredEvents = () => {
    switch (currentTab) {
      case "upcoming":
        return events.filter(e => e.status === "upcoming")
      case "technology":
        return events.filter(e => e.category === "Technology")
      default:
        return events
    }
  }

  const filteredEvents = getFilteredEvents()

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-8 md:py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-sm md:text-base text-gray-600 mb-4">Try adjusting your filters or search terms.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredEvents.map((event) => (
        <EventsCard key={event.id} event={event} />
      ))}
      <div className="col-span-full text-center mt-6">
        <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
          Load More Events
        </Button>
      </div>
    </div>
  )
}
