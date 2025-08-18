"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CommunityCreationForm } from "./community-creation-form"
import { toast } from "sonner"
import { X } from "lucide-react"

interface FormValues {
  title: string
  tagline: string
  description: string
  privacy: string
  communityType: string
  joiningTerms: string
  requireAdminApprovalForPosts: boolean
  allowMemberInvites: boolean
  enableEvents: boolean
  enableRatingsAndReviews: boolean
}

export default function CreateCommunity() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState<string>()
  const [loading, setLoading] = useState(false)

  const onCompleted = () => {
    setOpen(false)
    toast.success("Community created successfully!")
  }

  const onFinish = async (values: FormValues) => {
    setLoading(true)
    try {
      console.log("Creating community with values:", values, "and cover:", cover)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onCompleted()
    } catch (error) {
      toast.error("Failed to create community. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild>
    <Button>Create Community</Button>
  </SheetTrigger>
<SheetContent
  side="bottom"
  className="w-full !max-w-none h-full overflow-y-auto md:w-[500px]"
  style={{ width: "100%" }}
>
    <SheetHeader className="flex flex-row items-center justify-between">
      <div>
        <SheetTitle>Create Community</SheetTitle>
        <SheetDescription>Build your community and connect with like-minded people</SheetDescription>
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled={loading}
          onClick={() => {
            const form = document.querySelector("form")
            if (form) {
              form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }
          }}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      
      </div>
    </SheetHeader>

    <div className="mt-6">
      <CommunityCreationForm
        initialValues={{
          requireAdminApprovalForPosts: false,
          allowMemberInvites: false,
          enableEvents: false,
          enableRatingsAndReviews: false,
        }}
        loading={loading}
        onFinish={onFinish}
        cover={cover}
        setCover={setCover}
      />
    </div>
  </SheetContent>
</Sheet>

  )
}
