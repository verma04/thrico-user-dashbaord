"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { TabsContent } from "@/components/ui/tabs"

import {
  ImageIcon,
  Video,
} from "lucide-react"
import { RatingComponent } from "@/components/community-page/rating-component"
import { PostCard } from "@/components/community-page/post-card"
import { EventCard } from "@/components/community-page/event-card"
import { mockPosts, mockEvents } from "@/lib/mock-data"
import { useCommunityActions } from "@/hooks/use-community-actions"
import { useCommunityLayout } from "./layout"

interface CommunityDetailPageProps {
  params: { id: string }
}

export default function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  // Use context from layout
  const { community, handleRatingSubmit } = useCommunityLayout()
  
  const {
    posts,
    newPost,
    setNewPost,
    handleLikePost,
    handleCreatePost,
  } = useCommunityActions(community, mockPosts)

  return (
    <>
      <TabsContent value="discussions" className="space-y-4 md:space-y-6">
        {/* Create Post */}
        {community?.isJoined && (
          <Card>
            <CardContent className="pt-4 md:pt-6">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 md:w-10 md:h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share something with the community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[60px] md:min-h-[80px] mb-3 text-sm md:text-base"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 md:gap-2">
                      <Button variant="ghost" size="sm" className="text-xs md:text-sm h-7 md:h-8">
                        <ImageIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs md:text-sm h-7 md:h-8">
                        <Video className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Video
                      </Button>
                    </div>
                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      size="sm"
                      className="text-xs md:text-sm"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLikePost} />
        ))}
      </TabsContent>

      <TabsContent value="events">
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="ratings">
        <RatingComponent communityId={params.id} onRatingSubmit={handleRatingSubmit} showReviews={true} />
        <div className="mt-4">
          <Link href={`/communities/${params.id}/ratings`}>
            <Button variant="outline" className="w-full">
              View All Reviews & Ratings
            </Button>
          </Link>
        </div>
      </TabsContent>

      <TabsContent value="media">
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Community Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=150&width=150"
                    alt="Community media"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>About This Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-600">{community?.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Community Rules</h4>
              <ul className="space-y-2">
                {community?.rules?.map((rule: string, index: number) => (
                  <li key={index} className="text-gray-600">
                    {index + 1}. {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Community Details</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Privacy:</strong> {community?.privacy}
                </p>
                <p>
                  <strong>Join Condition:</strong> {community?.joinCondition}
                </p>
                <p>
                  <strong>Categories:</strong> {community?.categories?.join(", ")}
                </p>
                <p>
                  <strong>Location:</strong> {community?.location}
                </p>
                <p>
                  <strong>Created:</strong> January 15, 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  )
}
