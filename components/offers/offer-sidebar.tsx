import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ShoppingBag, Bookmark, BarChart2 } from "lucide-react"

// Mock data for sidebar components
const offerStats = [
  { label: "Total Offers", value: "3,456" },
  { label: "New Today", value: "45" },
  { label: "Your Offers", value: "12" },
  { label: "Saved Offers", value: "18" },
]

const popularCategories = [
  { name: "Electronics", count: 890, color: "bg-blue-500" },
  { name: "Home Goods", count: 720, color: "bg-green-500" },
  { name: "Vehicles", count: 510, color: "bg-purple-500" },
  { name: "Services", count: 380, color: "bg-orange-500" },
  { name: "Apparel", count: 250, color: "bg-red-500" },
]

export function OfferSidebar() {
  return (
    <div className="space-y-6">
      {/* Offer Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Offer Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {offerStats.map((stat, index) => (
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
              Create a New Offer
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Offers Made
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved Offers
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
