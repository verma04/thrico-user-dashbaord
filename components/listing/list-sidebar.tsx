import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Briefcase, Bookmark, BarChart2 } from "lucide-react"

// Mock data for sidebar components
const listingStats = [
  { label: "Total Listings", value: "5,678" },
  { label: "New Today", value: "78" },
  { label: "Your Enquiry", value: "15" },
  { label: "Saved Listings", value: "23" },
]

const popularCategories = [
  { name: "Electronics", count: 1234, color: "bg-blue-500" },
  { name: "Clothing & Fashion", count: 876, color: "bg-green-500" },
  { name: "Home & Garden", count: 654, color: "bg-purple-500" },
  { name: "Sports & Outdoors", count: 432, color: "bg-orange-500" },
  { name: "Books & Media", count: 310, color: "bg-red-500" },
  { name: "Pets & Animals", count: 589, color: "bg-yellow-500" },
  { name: "Vehicles", count: 345, color: "bg-pink-500" },
  { name: "Health & Beauty", count: 267, color: "bg-indigo-500" },
  { name: "Toys & Games", count: 198, color: "bg-teal-500" },
]

export function ListingSidebar() {
  return (
    <div className="space-y-6">
      {/* Listing Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Listing Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {listingStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className="font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Categories Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Post a New Listing
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Briefcase className="w-4 h-4 mr-2" />
              My Applications
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved Listings
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <BarChart2 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
