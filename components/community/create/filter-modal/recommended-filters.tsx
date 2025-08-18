"use client"

import { Button } from "@/components/ui/button"
import { Shield, Activity, MapPin } from "lucide-react"

const RECOMMENDED_FILTERS = [
  { key: "verified", label: "Verified", icon: Shield },
  { key: "active", label: "Active", icon: Activity },
  { key: "local", label: "Local", icon: MapPin },
]

interface RecommendedFiltersProps {
  selectedFeatures: string[]
  onToggleFeature: (feature: string) => void
}

export function RecommendedFilters({ selectedFeatures, onToggleFeature }: RecommendedFiltersProps) {
  return (
    <div>
    
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {RECOMMENDED_FILTERS.map(({ key, label, icon: Icon }) => {
          const isSelected = selectedFeatures.includes(key)
          return (
            <Button
              key={key}
              variant={isSelected ? "default" : "outline"}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => onToggleFeature(key)}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected ? "bg-white/20" : "bg-gray-100"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm">{label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
