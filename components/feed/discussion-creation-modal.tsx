"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Users, Eye } from "lucide-react";
import { usePostStore, type ForumData } from "@/lib/post-store";
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

interface DiscussionCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<ForumData>;
}

export function DiscussionCreationModal({
  open,
  onOpenChange,
  initialData,
}: DiscussionCreationModalProps) {
  const { data, loading: categoryLoading } = getDiscussionForumCategory();

  console.log(data);
  const { setForum, selectPostType } = usePostStore();

  const [formData, setFormData] = useState<ForumData>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    category: initialData?.category || null,
    isAnonymous: initialData?.isAnonymous || false,
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

  const handleSave = () => {
    if (validateForm()) {
      setForum(formData);
      selectPostType("discussion");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[85vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0 flex-shrink-0 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <DialogTitle>Create Discussion</DialogTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} size="sm">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.title.trim() || !formData.content.trim()}
              size="sm"
            >
              Create Discussion
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 pb-6">
            {/* Discussion Info */}
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

            {/* Title */}
            <div className="space-y-2">
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
            <div className="space-y-2">
              <Label htmlFor="content">Discussion Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
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

            <Separator />

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
                    {data?.getDiscussionForumCategory?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
                    setFormData((prev) => ({ ...prev, isAnonymous: checked }))
                  }
                />
              </div>

              {/* Visibility Info */}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
