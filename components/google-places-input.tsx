"use client"

import React from "react"
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete"

interface LocationData {
  name: string
  address: string
  latitude: number
  longitude: number
}

interface GooglePlacesInputProps {
  value?: string
  onChange: (location: LocationData) => void
  error?: boolean
  placeholder?: string
}

export function GooglePlacesInput({ value, onChange, error, placeholder = "Enter a location" }: GooglePlacesInputProps) {
  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      selectProps={{
        value: value ? { label: value, value } : null,
        onChange: async (val: any) => {
          if (val && val.value && val.value.place_id) {
            const results = await geocodeByPlaceId(val.value.place_id)
            const place = results[0]
            const location = place.geometry.location
            onChange({
              name: val.label,
              address: place.formatted_address,
              latitude: location.lat(),
              longitude: location.lng(),
            })
          }
        },
        placeholder,
        isClearable: true,
        styles: {
          control: (base: any) => ({
            ...base,
            borderColor: error ? "#ef4444" : base.borderColor,
            boxShadow: "none",
          }),
        },
      }}
    />
  )
}