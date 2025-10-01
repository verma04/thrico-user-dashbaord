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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  Vote,
  Shield,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { usePostStore, type PollTypeData } from "@/lib/post-store";

const resultVisibilityOptions = [
  {
    value: "AFTER_VOTE",
    label: "After Vote",
    description: "Results will be visible after the poll ends.",
    icon: Eye,
  },
  {
    value: "ALWAYS",
    label: "Always Visible",
    description: "Results will be visible to everyone at all times.",
    icon: Vote,
  },
  {
    value: "NEVER_VISIBLE",
    label: "Never Visible",
    description: "Results will never be visible.",
    icon: Shield,
  },
];

interface PollCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<PollTypeData>;
}

export function PollCreationModal({
  open,
  onOpenChange,
  initialData,
}: PollCreationModalProps) {
  const { setPollData, selectPostType } = usePostStore();

  const [formData, setFormData] = useState<PollTypeData>({
    title: initialData?.title || "",
    question: initialData?.question || "",
    options: initialData?.options || [{ option: "" }, { option: "" }],
    lastDate: initialData?.lastDate,
    resultVisibility: initialData?.resultVisibility || "AFTER_VOTE",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Please enter a title";
    }

    if (!formData.question.trim()) {
      newErrors.question = "Please enter a poll question";
    }

    const validOptions = formData.options.filter((opt) => opt.option.trim());
    if (validOptions.length < 2) {
      newErrors.options = "At least 2 options are required";
    }

    formData.options.forEach((option, index) => {
      if (!option.option.trim()) {
        newErrors[`option-${index}`] = "Option is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const cleanedData = {
        ...formData,
        title: formData.title || "Untitled Poll",
        options: formData.options.filter((opt) => opt.option.trim()),
      };
      setPollData(cleanedData);
      selectPostType("poll");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { option: "" }],
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData((prev) => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
      }));
    }
  };

  const moveOption = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < formData.options.length) {
      const newOptions = [...formData.options];
      const temp = newOptions[index];
      newOptions[index] = newOptions[newIndex];
      newOptions[newIndex] = temp;
      setFormData((prev) => ({ ...prev, options: newOptions }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { option: value } : opt
      ),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Create Poll</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] px-6">
          <div className="space-y-6 pb-6">
            {/* Title and Question */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Poll Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter poll title"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">Poll Question *</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  placeholder="What's your question?"
                  className={errors.question ? "border-red-500" : ""}
                  rows={3}
                />
                {errors.question && (
                  <p className="text-sm text-red-500">{errors.question}</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Poll Options */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Poll Options</Label>
                <p className="text-sm text-muted-foreground">
                  Add at least 2 options for your poll
                </p>
              </div>

              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveOption(index, "up")}
                      disabled={index === 0}
                      className="h-8 w-8 p-0 shrink-0"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>

                    <div className="flex-1">
                      <Input
                        value={option.option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className={
                          errors[`option-${index}`] ? "border-red-500" : ""
                        }
                      />
                      {errors[`option-${index}`] && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors[`option-${index}`]}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveOption(index, "down")}
                      disabled={index === formData.options.length - 1}
                      className="h-8 w-8 p-0 shrink-0"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      disabled={formData.options.length <= 2}
                      className="h-8 w-8 p-0 shrink-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {errors.options && (
                  <p className="text-sm text-red-500">{errors.options}</p>
                )}

                <Button
                  variant="outline"
                  onClick={addOption}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>

            <Separator />

            {/* Poll Settings */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Poll Settings</Label>

              {/* End Date */}
              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.lastDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastDate
                        ? format(formData.lastDate, "PPP")
                        : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.lastDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, lastDate: date }))
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formData.lastDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, lastDate: undefined }))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Clear Date
                  </Button>
                )}
              </div>

              {/* Result Visibility */}
              <div className="space-y-3">
                <div>
                  <Label>Results Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose when poll results should be visible
                  </p>
                </div>

                <Select
                  value={formData.resultVisibility}
                  onValueChange={(value: any) =>
                    setFormData((prev) => ({
                      ...prev,
                      resultVisibility: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {resultVisibilityOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {option.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create Poll</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
