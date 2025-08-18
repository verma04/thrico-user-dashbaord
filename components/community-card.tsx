import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, Eye, Globe, MessageSquare, MoreHorizontal, Star, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CommunityCardProps {
  imageSrc: string
  title: string
  description: string
  creatorName: string
  creatorAvatar: string
  createdDate: string
  members: { avatar: string }[]
  memberCount: string
  commentCount: string
  viewCount: string
}

export function CommunityCard({
  imageSrc,
  title,
  description,
  creatorName,
  creatorAvatar,
  createdDate,
  members,
  memberCount,
  commentCount,
  viewCount,
}: CommunityCardProps) {
  return (
    <Link href={`/communities/1`} passHref>
      <Card className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg">
        <CardHeader className="p-0 relative h-40">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
          quality={100}
        />
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
            <Globe className="w-4 h-4 text-gray-700" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
            <Star className="w-4 h-4 text-gray-700" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-gray-700" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
            <MoreHorizontal className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h2>
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>

        

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={creatorAvatar || "/placeholder.svg"} alt={creatorName} />
              <AvatarFallback>
                {creatorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-gray-700">
              Created by <span className="text-blue-600 font-medium">{creatorName}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <CalendarDays className="w-5 h-5 text-gray-500" />
            <p className="text-sm text-gray-700">Created on {createdDate}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex -space-x-2 overflow-hidden">
            {members.slice(0, 4).map((member, index) => (
              <Avatar key={index} className="w-10 h-10 border-2 border-white">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={`Member ${index + 1}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
            {members.length > 4 && (
              <div className="w-10 h-10 bg-blue-500 text-white text-sm font-bold flex items-center justify-center rounded-full border-2 border-white z-10">
                +1k
              </div>
            )}
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md">
            Join
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t border-gray-200 divide-x divide-gray-200">
        <div className="flex-1 flex items-center justify-center py-3 space-x-2">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="text-base font-medium text-gray-800">{memberCount}</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-3 space-x-2">
          <MessageSquare className="w-5 h-5 text-gray-500" />
          <span className="text-base font-medium text-gray-800">{commentCount}</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-3 space-x-2">
          <Eye className="w-5 h-5 text-gray-500" />
          <span className="text-base font-medium text-gray-800">{viewCount}</span>
        </div>
      </CardFooter>
    </Card>
  </Link>


)
}