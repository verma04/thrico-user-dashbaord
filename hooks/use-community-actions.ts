import { useState, useCallback, useMemo } from "react"
import { toast } from "sonner"
import type { Community, Post } from "@/types/community"

export function useCommunityActions(initialCommunity: Community, initialPosts: Post[]) {
  const [community, setCommunity] = useState<Community>(initialCommunity)
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinCommunity = useCallback((message?: string) => {
    setIsJoining(true)
    
    // Simulate API call
    setTimeout(() => {
      const wasJoined = community.isJoined
      
      setCommunity((prev) => ({
        ...prev,
        isJoined: !prev.isJoined,
        members: prev.isJoined ? prev.members - 1 : prev.members + 1,
      }))
      setIsJoining(false)
      
      if (!wasJoined) {
        // Joining the community
        if (community.joinCondition === "Admin approval required") {
          toast.success("Join request sent!", {
            description: message 
              ? "Your request with message has been sent to the admins for review."
              : "Your join request has been sent to the admins for review."
          })
        } else {
          toast.success("Welcome to the community!", {
            description: message 
              ? "You've joined the community and shared your introduction."
              : "You've successfully joined the community."
          })
        }
        
        // Log the join request message (in real app, this would be sent to backend)
        if (message) {
          console.log('Join request message:', message)
        }
      } else {
        // Leaving the community
        toast.info("You've left the community", {
          description: "You can rejoin anytime if you change your mind."
        })
      }
    }, 1000)
  }, [community.isJoined, community.joinCondition])

  const handleLikePost = useCallback((postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }, [])

  const handleCreatePost = useCallback(() => {
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Member",
        },
        content: newPost,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        rating: 0,
        isLiked: false,
        isRated: false,
      }
      setPosts((prevPosts) => [post, ...prevPosts])
      setNewPost("")
    }
  }, [newPost, posts.length])

  const handleRatingSubmit = useCallback((rating: number, review?: string) => {
    console.log("Rating submitted:", rating, review)
    // TODO: In a real app, this would submit to the backend
  }, [])

  const canManageCommunity = useMemo(
    () => community.userRole === "admin" || community.userRole === "co-admin",
    [community.userRole]
  )

  const formattedMemberCount = useMemo(() => {
    return community.members > 1000 
      ? `${(community.members / 1000).toFixed(1)}K` 
      : community.members.toString()
  }, [community.members])

  return {
    community,
    posts,
    newPost,
    setNewPost,
    handleJoinCommunity,
    handleLikePost,
    handleCreatePost,
    handleRatingSubmit,
    canManageCommunity,
    formattedMemberCount,
    isJoining,
  }
}
