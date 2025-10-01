import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function MyCalendar() {
  const items = [
    {
      title: "Tech Networking Event",
      time: "Tomorrow, 6:00 PM",
      type: "event",
      priority: "low",
      location: "San Francisco",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">My Calendar - What's Next</CardTitle>
        <CardDescription>Upcoming events and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 border rounded-lg"
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  item.priority === "high"
                    ? "bg-red-500"
                    : item.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              ></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.time}</p>
                <p className="text-xs text-gray-500">{item.location}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {item.type}
              </Badge>
            </div>
          ))}
        </div>
        <Link href="/dashboard/events">
          <Button size="sm" className="w-full mt-4">
            View Full Calendar
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}