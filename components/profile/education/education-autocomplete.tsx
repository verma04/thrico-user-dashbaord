"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus } from 'lucide-react'

interface School {
  id: string;
  name: string;
  logo?: string;
}

interface EducationAutocompleteProps {
  onChange: (value: School) => void;
  initialValue?: School;
  placeholder?: string;
}

// Mock data for schools - in real app this would come from API
const mockSchools: School[] = [
  { id: "1", name: "Harvard University", logo: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Stanford University", logo: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "MIT", logo: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "University of California, Berkeley", logo: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Oxford University", logo: "/placeholder.svg?height=40&width=40" },
]

export function EducationAutocomplete({ onChange, initialValue, placeholder = "Search for a School/Institute" }: EducationAutocompleteProps) {
  const [searchValue, setSearchValue] = useState("")
  const [filteredSchools, setFilteredSchools] = useState<School[]>([])
  const [selectedSchool, setSelectedSchool] = useState<School | null>(initialValue || null)

  useEffect(() => {
    if (searchValue) {
      const filtered = mockSchools.filter(school =>
        school.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredSchools(filtered)
    } else {
      setFilteredSchools([])
    }
  }, [searchValue])

  const handleSelect = (schoolId: string) => {
    const school = mockSchools.find(s => s.id === schoolId)
    if (school) {
      setSelectedSchool(school)
      onChange(school)
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {searchValue && (
        <div className="border rounded-lg max-h-48 overflow-y-auto">
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <div
                key={school.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelect(school.id)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={school.logo || "/placeholder.svg"} />
                  <AvatarFallback>{school.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{school.name}</span>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              <p className="text-sm">No schools found</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add New School
              </Button>
            </div>
          )}
        </div>
      )}

      {selectedSchool && (
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarImage src={selectedSchool.logo || "/placeholder.svg"} />
            <AvatarFallback>{selectedSchool.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{selectedSchool.name}</span>
        </div>
      )}
    </div>
  )
}
