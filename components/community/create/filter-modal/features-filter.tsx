"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Calendar, Shield, MessageCircle, BookOpen, Users, GraduationCap } from "lucide-react"

const FEATURES = [
  { key: "events", label: "Events", icon: Calendar },
  { key: "moderated", label: "Moderated", icon: Shield },
  { key: "chat", label: "Live Chat", icon: MessageCircle },
  { key: "resources", label: "Resources", icon: BookOpen },
  { key: "networking", label: "Networking", icon: Users },
  { key: "mentorship", label: "Mentorship", icon: GraduationCap },
]

interface FeaturesFilterProps {
  selectedFeatures: string[]
  onToggleFeature: (feature: string) => void
  showMore: boolean
  onToggleShowMore: () => void
}

export function FeaturesFilter({ selectedFeatures, onToggleFeature, showMore, onToggleShowMore }: FeaturesFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Features</h3>
      <div className="grid grid-cols-2 gap-3">
        {(showMore ? FEATURES : FEATURES.slice(0, 6)).map(({ key, label, icon: Icon }) => {
          const isSelected = selectedFeatures.includes(key)
          return (
            <Button
              key={key}
              variant={isSelected ? "default" : "outline"}
              className="flex items-center gap-2 justify-start h-auto py-3"
              onClick={() => onToggleFeature(key)}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </Button>
          )
        })}
      </div>
      {FEATURES.length > 6 && (
        <Button variant="ghost" onClick={onToggleShowMore} className="w-full mt-3">
          {showMore ? "Show less" : "Show more"}
          {showMore ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </Button>
      )}
    </div>
  )
}
