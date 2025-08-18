"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Clock, Activity } from "lucide-react"

interface SortAndLocationProps {
  sortBy: "popular" | "newest" | "active"
  location: string
  onSortChange: (sort: "popular" | "newest" | "active") => void
  onLocationChange: (location: string) => void
}

export function SortAndLocation({ sortBy, location, onSortChange, onLocationChange }: SortAndLocationProps) {
  return (
    <div className="space-y-6">
      {/* Sort By */}
      <div>
        <h3 className="text-lg font-medium mb-4">Sort by</h3>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Most Popular
              </div>
            </SelectItem>
            <SelectItem value="newest">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Newest
              </div>
            </SelectItem>
            <SelectItem value="active">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Most Active
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-lg font-medium mb-4">Location</h3>
        <Input placeholder="Enter location..." value={location} onChange={(e) => onLocationChange(e.target.value)} />
      </div>
    </div>
  )
}
