import { useState } from "react";
import { format } from "date-fns";
import { Plus, ArrowRight, Trash2, CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { socialPlatforms } from "@/data/social-platforms";
import { Highlighter } from "../magicui/highlighter";

interface StepGoalsProps {
  onComplete?: () => void;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export function StepGoals({ onComplete }: StepGoalsProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: null as Date | null,
    country: "",
    phone: "",
    timeZone: "",
    language: "",
    gender: "",
    pronouns: "",
    currentPosition: "",
    headline: "",
    location: "",
    aboutText: "",
    socialLinks: [] as SocialLink[],
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Math.random().toString(36).substr(2, 9),
      platform: "",
      url: "",
    };
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink],
    }));
  };

  const updateSocialLink = (
    id: string,
    field: keyof SocialLink,
    value: strings
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    }));
  };

  const removeSocialLink = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }));
  };

  const nextStep = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const renderStepIndicator = () => {
    // Implement step indicator here if needed
    return null;
  };
  return (
    <>
      <h2
        id="basic-info-heading"
        className="text-pretty text-3xl font-semibold leading-tight md:text-4xl text-center mb-2"
      >
        Create Your Professional Profile
      </h2>
      <p className="text-muted-foreground  text-lg mb-6">
        Share your <Highlighter>experience and expertise</Highlighter> to connect with opportunities that match your <Highlighter  action="underline" color="#87CEFA">goals</Highlighter>
      </p>
      <Card className="w-full max-w-4xl mx-auto border-2 border-blue-200 rounded-3xl shadow-lg">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => updateFormData({ country: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentPosition">Current Position</Label>
            <Input
              id="currentPosition"
              value={formData.currentPosition}
              onChange={(e) =>
                updateFormData({ currentPosition: e.target.value })
              }
              placeholder="Enter your current position"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Professional Headline</Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => updateFormData({ headline: e.target.value })}
              placeholder="Enter a professional headline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              placeholder="Enter your location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutText">About</Label>
            <Textarea
              id="aboutText"
              value={formData.aboutText}
              onChange={(e) => updateFormData({ aboutText: e.target.value })}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>

          <div className="flex justify-end pt-6">
            <Button
              onClick={nextStep}
       
            >
              Next
             
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
