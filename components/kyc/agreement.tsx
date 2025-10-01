import React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const Agreement = () => {
  return (
    <Sheet>
      <SheetTrigger className="text-primary hover:underline cursor-pointer">
        agreement
      </SheetTrigger>
      <SheetContent className="w-[800px] sm:max-w-full">
        <SheetHeader>
          <SheetTitle>Terms and Conditions</SheetTitle>
          <SheetDescription className="space-y-4 mt-4">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}