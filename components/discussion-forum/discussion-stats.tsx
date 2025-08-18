import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { label: "Total Discussions", value: "1,234" },
  { label: "Active Today", value: "45" },
  { label: "Your Posts", value: "12" },
  { label: "Your Replies", value: "67" },
]

export function DiscussionStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Discussion Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
