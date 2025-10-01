"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus } from 'lucide-react'

interface Company {
  id: string;
  name: string;
  logo?: string;
}

interface CompanyAutocompleteProps {
  onChange: (value: Company) => void;
  initialValue?: Company;
  placeholder?: string;
}

// Mock data for companies - in real app this would come from API
const mockCompanies: Company[] = [
  { id: "1", name: "Google", logo: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Microsoft", logo: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Apple", logo: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Amazon", logo: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Meta", logo: "/placeholder.svg?height=40&width=40" },
  { id: "6", name: "Netflix", logo: "/placeholder.svg?height=40&width=40" },
  { id: "7", name: "Tesla", logo: "/placeholder.svg?height=40&width=40" },
]

export function CompanyAutocomplete({ onChange, initialValue, placeholder = "Search for a company" }: CompanyAutocompleteProps) {
  const [searchValue, setSearchValue] = useState("")
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(initialValue || null)

  useEffect(() => {
    if (searchValue) {
      const filtered = mockCompanies.filter(company =>
        company.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredCompanies(filtered)
    } else {
      setFilteredCompanies([])
    }
  }, [searchValue])

  const handleSelect = (companyId: string) => {
    const company = mockCompanies.find(c => c.id === companyId)
    if (company) {
      setSelectedCompany(company)
      onChange(company)
      setSearchValue("")
      setFilteredCompanies([])
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
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelect(company.id)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={company.logo || "/placeholder.svg"} />
                  <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{company.name}</span>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              <p className="text-sm">No companies found</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add New Company
              </Button>
            </div>
          )}
        </div>
      )}

      {selectedCompany && (
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarImage src={selectedCompany.logo || "/placeholder.svg"} />
            <AvatarFallback>{selectedCompany.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{selectedCompany.name}</span>
        </div>
      )}
    </div>
  )
}
