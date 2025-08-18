import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  { name: "Technology", count: 234, color: "bg-blue-500" },
  { name: "Career", count: 189, color: "bg-green-500" },
  { name: "General", count: 156, color: "bg-purple-500" },
  { name: "Help", count: 89, color: "bg-orange-500" },
  { name: "Business", count: 67, color: "bg-red-500" },
]

export function PopularCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Popular Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categories.map((category, index) => (
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
  )
}
