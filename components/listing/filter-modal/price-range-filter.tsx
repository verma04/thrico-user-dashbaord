"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface PriceRangeFilterProps {
  priceRange: { min: number; max: number }
  onPriceChange: (range: { min: number; max: number }) => void
}

export function PriceRangeFilter({ priceRange, onPriceChange }: PriceRangeFilterProps) {
  const handleSliderChange = (values: number[]) => {
    onPriceChange({ min: values[0], max: values[1] })
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(e.target.value) || 0
    onPriceChange({ ...priceRange, min })
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseInt(e.target.value) || 10000
    onPriceChange({ ...priceRange, max })
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Price Range</h3>
      
      <div className="space-y-4">
        <div className="px-2">
          <Slider
            value={[priceRange.min, priceRange.max]}
            onValueChange={handleSliderChange}
            max={10000}
            min={0}
            step={50}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Label htmlFor="min-price" className="text-sm">Min</Label>
            <Input
              id="min-price"
              type="number"
              value={priceRange.min}
              onChange={handleMinChange}
              placeholder="0"
              className="mt-1"
            />
          </div>
          <span className="text-gray-500 mt-6">-</span>
          <div className="flex-1">
            <Label htmlFor="max-price" className="text-sm">Max</Label>
            <Input
              id="max-price"
              type="number"
              value={priceRange.max}
              onChange={handleMaxChange}
              placeholder="10000"
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-600 text-center">
          ${priceRange.min} - ${priceRange.max}
        </div>
      </div>
    </div>
  )
}
