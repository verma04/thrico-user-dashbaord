"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Users, ChevronDown } from "lucide-react"

interface PrivacyOption {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  value: string
}

const privacyOptions: PrivacyOption[] = [
  {
    title: "Anyone",
    subtitle: "Anyone on Platform",
    icon: Globe,
    value: "PUBLIC",
  },
  {
    title: "Connections",
    subtitle: "Connections only",
    icon: Users,
    value: "CONNECTIONS",
  },
]

interface PrivacySelectorProps {
  privacy: string
  setPrivacy: (value: string) => void
}

export function PrivacySelector({ privacy, setPrivacy }: PrivacySelectorProps) {
  const currentOption = privacyOptions.find((option) => option.value === privacy) || privacyOptions[0]
  const IconComponent = currentOption.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 text-sm">
          <IconComponent className="h-4 w-4" />
          {currentOption.subtitle}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {privacyOptions.map((option) => {
          const OptionIcon = option.icon
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setPrivacy(option.value)}
              className="flex items-center gap-3 p-3"
            >
              <div className="p-2 bg-primary/10 rounded-full">
                <OptionIcon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{option.title}</div>
                <div className="text-sm text-muted-foreground">{option.subtitle}</div>
              </div>
              {privacy === option.value && <div className="h-2 w-2 bg-primary rounded-full" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
