"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock } from "lucide-react"

interface CommunityPreviewProps {
  formData: {
    title?: string
    tagline?: string
    description?: string
    privacy?: string
    enableEvents?: boolean
  }
  imageUrl: string | null
}

export function CommunityPreview({ formData, imageUrl }: CommunityPreviewProps) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-[3/1] overflow-hidden bg-gray-100 rounded-t-lg">
          <Image
            src={imageUrl || "https://cdn.thrico.network/defaultEventCover.png"}
            alt="Community cover"
            width={600}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg truncate flex-1">{formData?.title || "Community Name"}</h3>
            {formData?.privacy === "PUBLIC" ? (
              <Globe className="w-4 h-4 text-gray-500" />
            ) : (
              <Lock className="w-4 h-4 text-gray-500" />
            )}
          </div>

          {formData?.tagline && <p className="text-sm text-gray-600 mb-4">{formData.tagline}</p>}

          <Tabs defaultValue="discussion" className="w-full">
            <TabsList className="flex w-full overflow-x-auto whitespace-nowrap justify-start md:grid md:grid-cols-5">
              <TabsTrigger value="discussion" className="px-4 py-2 min-w-max">
                Discussion
              </TabsTrigger>
              <TabsTrigger value="featured" className="px-4 py-2 min-w-max">
                Featured
              </TabsTrigger>
              <TabsTrigger value="people" className="px-4 py-2 min-w-max">
                People
              </TabsTrigger>
              <TabsTrigger value="media" className="px-4 py-2 min-w-max">
                Media
              </TabsTrigger>
              <TabsTrigger value="events" className="px-4 py-2 min-w-max">
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussion" className="mt-4">
              <div className="grid grid-cols-3 text-center mb-4">
                <div>
                  <div className="text-2xl font-semibold">0</div>
                  <div className="text-xs text-gray-500">Members</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">0</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">0</div>
                  <div className="text-xs text-gray-500">Events</div>
                </div>
              </div>

              {formData?.description ? (
                <p className="text-sm leading-relaxed">{formData.description}</p>
              ) : (
                <div className="flex items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
                  <p className="text-sm text-gray-500">Community description will appear here</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="featured">
              <div className="text-center py-8 text-gray-500">Featured content will appear here</div>
            </TabsContent>

            <TabsContent value="people">
              <div className="text-center py-8 text-gray-500">Community members will appear here</div>
            </TabsContent>

            <TabsContent value="media">
              <div className="text-center py-8 text-gray-500">Media content will appear here</div>
            </TabsContent>

            <TabsContent value="events">
              <div className="text-center py-8 text-gray-500">Community events will appear here</div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
