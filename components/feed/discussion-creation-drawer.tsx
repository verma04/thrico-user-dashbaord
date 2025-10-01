"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Users, Eye, Plus } from "lucide-react";
import { usePostStore, type ForumData } from "@/lib/post-store";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDrawerStore } from "@/store/drawer-store";
import { getDiscussionForumCategory } from "../grapqhl/action/feed";

const discussionCategories = [
  "General Discussion",
  "Technology",
  "Career Advice",
  "Industry News",
  "Best Practices",
  "Tools & Resources",
  "Networking",
  "Learning & Development",
  "Project Showcase",
  "Q&A",
];

export function DiscussionCreationDrawer() {
  const { data, loading: categoryLoading } = getDiscussionForumCategory();

  console.log(data);
  const isDrawerOpen = useDrawerStore((s) => s.isForumDrawerOpen);
  const setDrawerOpen = useDrawerStore((s) => s.setForumDrawerOpen);

  const { setForum, selectPostType } = usePostStore();
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState<ForumData>({
    title: "",
    content: "",
    category: null,
    isAnonymous: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Discussion title is required";
    }
    if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Discussion content is required";
    }
    if (formData.content.length > 5000) {
      newErrors.content = "Content must be less than 5000 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validateForm()) {
      setForum(formData);
      selectPostType("discussion");
      setDrawerOpen(false);
    }
  };

  const handleCancel = () => {
    setDrawerOpen(false);
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Discussion
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`
          ${isMobile ? "h-[95vh] w-full rounded-t-lg" : "w-full sm:max-w-3xl"}
          overflow-y-auto p-0
        `}
      >
        <form
          id="discussion-form"
          className="flex flex-col h-full"
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <div
            className={`
              flex items-center justify-between p-4 sm:p-6 border-b bg-white sticky top-0 z-10
              ${isMobile ? "flex-col space-y-3" : "flex-row"}
            `}
          >
            <div className={isMobile ? "text-center" : ""}>
              <SheetTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
                <MessageSquare className="h-5 w-5 text-primary" />
                Create Discussion
              </SheetTitle>
              <p className="text-sm text-gray-500 mt-1">
                Start a conversation, ask questions, or share insights with the
                community.
              </p>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                isMobile ? "w-full" : ""
              }`}
            >
              <Button
                type="submit"
                disabled={!formData.title.trim() || !formData.content.trim()}
                size="sm"
                className={isMobile ? "flex-1" : ""}
              >
                Create Discussion
              </Button>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleCancel}
                className={isMobile ? "flex-1" : ""}
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {/* Discussion Info */}
            <div className="p-4 bg-muted/30 rounded-lg mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="font-medium">Discussion Forum</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Start a conversation, ask questions, or share insights with the
                community.
              </p>
            </div>

            {/* Title */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="title">Discussion Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="What would you like to discuss?"
                className={errors.title ? "border-red-500" : ""}
              />
              <div className="flex justify-between text-sm">
                {errors.title && (
                  <span className="text-red-500">{errors.title}</span>
                )}
                <span className="text-muted-foreground ml-auto">
                  {formData.title.length}/200
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="content">Discussion Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="Share your thoughts, ask questions, or provide context for your discussion..."
                className={`min-h-[150px] ${
                  errors.content ? "border-red-500" : ""
                }`}
                rows={8}
              />
              <div className="flex justify-between text-sm">
                {errors.content && (
                  <span className="text-red-500">{errors.content}</span>
                )}
                <span className="text-muted-foreground ml-auto">
                  {formData.content.length}/5000
                </span>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Discussion Settings */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Discussion Settings
              </Label>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category || ""}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {discussionCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Anonymous Posting */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <Label htmlFor="anonymous">Post Anonymously</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your name and profile will be hidden from other users
                  </p>
                </div>
                <Switch
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      isAnonymous: checked,
                    }))
                  }
                />
              </div>

              {/* Visibility Info */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Eye className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">
                    Discussion Visibility
                  </p>
                  <p className="text-blue-700">
                    This discussion will be visible to all community members and
                    can receive replies and reactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
