import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity } from "lucide-react"

interface PointActivity {
  id: string
  activity: string
  points: number
  date: string
}

const mockPointActivities: PointActivity[] = [
  { id: "1", activity: "Created a new discussion post", points: 50, date: "2024-07-20" },
  { id: "2", activity: "Received 10 upvotes on a reply", points: 20, date: "2024-07-19" },
  { id: "3", activity: "Successfully referred a friend", points: 100, date: "2024-07-18" },
  { id: "4", activity: "Completed profile setup", points: 30, date: "2024-07-17" },
  { id: "5", activity: "Made an offer on a marketplace listing", points: 15, date: "2024-07-16" },
  { id: "6", activity: "Applied to a job", points: 25, date: "2024-07-15" },
  { id: "7", activity: 'Received a badge: "First Post"', points: 50, date: "2024-07-14" },
  { id: "8", activity: "Logged in daily streak (Day 5)", points: 10, date: "2024-07-13" },
  { id: "9", activity: "Viewed 20 marketplace listings", points: 10, date: "2024-07-12" },
  { id: "10", activity: "Replied to a discussion post", points: 5, date: "2024-07-11" },
  { id: "11", activity: "Edited profile information", points: 5, date: "2024-07-10" },
  { id: "12", activity: "Shared a listing on social media", points: 10, date: "2024-07-09" },
  { id: "13", activity: "Received 5 likes on a discussion post", points: 10, date: "2024-07-08" },
]

export function PointsSourceTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Points Activity Log</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Here's a detailed breakdown of how you've earned your points. Keep engaging to earn more!
        </p>
        <ScrollArea className="h-[300px] w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPointActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.activity}</TableCell>
                  <TableCell className="text-right text-green-600 font-semibold">+{activity.points}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{activity.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
