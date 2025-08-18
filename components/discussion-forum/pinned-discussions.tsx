import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pin } from "lucide-react"

export function PinnedDiscussions() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Pin className="w-5 h-5 mr-2 text-yellow-500" />
        Pinned Discussions
      </h2>
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {" "}
            {/* Flex-col on small, row on sm+ */}
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
              {" "}
              {/* Responsive avatar size */}
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 w-full">
              {" "}
              {/* Ensure content takes full width on small screens */}
              <div className="flex flex-wrap items-center space-x-2 mb-2">
                {" "}
                {/* Flex-wrap for badges */}
                <h3 className="font-semibold text-base sm:text-lg">Community Guidelines & Welcome</h3>{" "}
                {/* Responsive text size */}
                <Badge variant="secondary" className="text-xs">
                  Pinned
                </Badge>
                <Badge variant="outline" className="text-xs">
                  General
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Welcome to our community! Please read our guidelines for a positive experience.
              </p>
              <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 text-xs text-gray-500">
                {" "}
                {/* Flex-wrap for info */}
                <span>By Admin</span>
                <span>•</span>
                <span>234 replies</span>
                <span>•</span>
                <span>Last reply 2 hours ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
