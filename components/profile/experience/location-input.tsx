"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { MapPin } from 'lucide-react'

interface Location {
  name: string;
  coordinates?: [number, number];
}

interface LocationInputProps {
  onChange: (value: Location) => void;
  initialValue?: Location;
  placeholder?: string;
}

export function LocationInput({ onChange, initialValue, placeholder = "Enter location" }: LocationInputProps) {
  const [value, setValue] = useState(initialValue?.name || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange({ name: newValue })
  }

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
}
