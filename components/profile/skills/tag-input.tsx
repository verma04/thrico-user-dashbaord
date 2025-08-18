"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'

import { Button } from "@/components/ui/button"

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  category?: string
  label?: string
  placeholder?: string
  error?: boolean
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  category,
  label,
  placeholder,
  error,
}) => {
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag])
      setInputValue("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      handleAddTag(inputValue)
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      e.preventDefault()
      handleRemoveTag(tags[tags.length - 1])
    }
  }

  // Example suggestedTags object. Replace or extend categories/tags as needed.
  const suggestedTags: { [key: string]: string[] } = {
    frontend: ["React", "Vue", "Angular", "TypeScript"],
    backend: ["Node.js", "Express", "Django", "Flask"],
    devops: ["Docker", "Kubernetes", "AWS", "Azure"],
  }
  
    const currentSuggestedTags = category ? suggestedTags[category] || [] : []

  return (
    <div className="grid gap-2">
      {label && <Label htmlFor="tag-input">{label}</Label>}
      <div className="flex flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        <Input
          id="tag-input"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-none p-0 shadow-none focus-visible:ring-0"
          aria-invalid={error}
        />
      </div>
      {error && <p className="text-sm text-red-500">Please add at least one tag</p>}

      {currentSuggestedTags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {currentSuggestedTags.map((tag) => (
            <Button
              key={tag}
              type="button"
              variant="outline"
              size="sm"
              className="h-auto px-2 py-1 text-xs"
              onClick={() => handleAddTag(tag)}
              disabled={tags.includes(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
