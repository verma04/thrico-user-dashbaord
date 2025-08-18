"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OfferFilterState } from "./offers-list"

interface OfferFilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: OfferFilterState
  onFiltersChange: (filters: OfferFilterState) => void
  resultCount: number
}

const CATEGORIES = [
  "Electronics",
  "Home Goods", 
  "Vehicles",
  "Services",
  "Apparel",
  "Books",
  "Sports & Recreation",
  "Health & Beauty",
  "Tools & Hardware",
  "Toys & Games"
]

const CONDITIONS = [
  "New",
  "Used - Like New", 
  "Used - Good",
  "Used - Fair"
]

const OFFER_TYPES = [
  "For Sale",
  "For Rent",
  "Free",
  "Trade/Exchange",
  "Service Offered",
  "Service Wanted"
]

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" }
]

export function OfferFilterModal({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  resultCount,
}: OfferFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<OfferFilterState>(filters)

  const handleApply = () => {
    onFiltersChange(localFilters)
    onOpenChange(false)
  }

  const handleReset = () => {
    const resetFilters: OfferFilterState = {
      searchText: "",
      categories: [],
      conditions: [],
      priceRange: { min: 0, max: 10000 },
      offerTypes: [],
      sortBy: "newest",
      location: "",
    }
    setLocalFilters(resetFilters)
  }

  const handleCategoryToggle = (category: string) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handleConditionToggle = (condition: string) => {
    setLocalFilters(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }))
  }

  const handleOfferTypeToggle = (type: string) => {
    setLocalFilters(prev => ({
      ...prev,
      offerTypes: prev.offerTypes.includes(type)
        ? prev.offerTypes.filter(t => t !== type)
        : [...prev.offerTypes, type]
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Offers</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={localFilters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label htmlFor={category} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Condition */}
          <div>
            <h3 className="font-semibold mb-3">Condition</h3>
            <div className="grid grid-cols-2 gap-2">
              {CONDITIONS.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={localFilters.conditions.includes(condition)}
                    onCheckedChange={() => handleConditionToggle(condition)}
                  />
                  <Label htmlFor={condition} className="text-sm cursor-pointer">
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Offer Types */}
          <div>
            <h3 className="font-semibold mb-3">Offer Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {OFFER_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={localFilters.offerTypes.includes(type)}
                    onCheckedChange={() => handleOfferTypeToggle(type)}
                  />
                  <Label htmlFor={type} className="text-sm cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">
                  ${localFilters.priceRange.min} - ${localFilters.priceRange.max}
                </Label>
                <Slider
                  value={[localFilters.priceRange.min, localFilters.priceRange.max]}
                  onValueChange={([min, max]) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      priceRange: { min, max }
                    }))
                  }
                  max={10000}
                  min={0}
                  step={50}
                  className="mt-2"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="min-price" className="text-sm">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={localFilters.priceRange.min}
                    onChange={(e) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: parseInt(e.target.value) || 0 }
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="max-price" className="text-sm">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={localFilters.priceRange.max}
                    onChange={(e) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: parseInt(e.target.value) || 10000 }
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-3">Location</h3>
            <Input
              placeholder="Enter city, state, or zip code"
              value={localFilters.location}
              onChange={(e) =>
                setLocalFilters(prev => ({
                  ...prev,
                  location: e.target.value
                }))
              }
            />
          </div>

          <Separator />

          {/* Sort By */}
          <div>
            <h3 className="font-semibold mb-3">Sort By</h3>
            <Select
              value={localFilters.sortBy}
              onValueChange={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  sortBy: value as OfferFilterState["sortBy"]
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose sorting option" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset All
          </Button>
          <Button onClick={handleApply}>
            Show {resultCount} Results
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
