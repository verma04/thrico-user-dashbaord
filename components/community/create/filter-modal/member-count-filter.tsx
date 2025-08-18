"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MemberCountFilterProps {
  memberRange: { min: number; max: number }
  onRangeChange: (range: { min: number; max: number }) => void
}

export function MemberCountFilter({ memberRange, onRangeChange }: MemberCountFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Member count</h3>
      <p className="text-sm text-gray-600 mb-4">Community size range</p>

      {/* Simple histogram visualization */}
      <div className="flex items-end h-16 gap-1 mb-4">
        {[0.2, 0.4, 0.8, 0.3, 0.6, 1.0, 0.7, 0.5, 0.9, 0.4, 0.3, 0.6, 0.2, 0.4, 0.1].map((height, index) => (
          <div key={index} className="flex-1 bg-blue-500 rounded-sm" style={{ height: `${height * 60}px` }} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm text-gray-600">Minimum</Label>
          <Input
            type="number"
            value={memberRange.min}
            onChange={(e) =>
              onRangeChange({
                ...memberRange,
                min: Number.parseInt(e.target.value) || 0,
              })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm text-gray-600">Maximum</Label>
          <Input
            type="number"
            value={memberRange.max > 9999 ? "10000+" : memberRange.max}
            onChange={(e) => {
              const value = e.target.value.replace("+", "")
              onRangeChange({
                ...memberRange,
                max: Number.parseInt(value) || 10000,
              })
            }}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )
}
