"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  showCreateButton?: boolean
}

export function EmptyState({ title, description, showCreateButton = false }: EmptyStateProps) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          {showCreateButton && (
            <Link href="/dashboard/communities/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Community
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
