"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  MoreVertical,
  Bookmark,
  Share2,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { ApplyJobModal } from "./apply-job-modal";
import CardSubTitle from "../card-subtitle";
import CardTitle from "../card-title";

interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: "Entry-level" | "Mid-level" | "Senior" | "Executive" | "Lead";
  salary?: string;
  description: string;
  postedAgo: string;
  category: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isSaved?: boolean; // Added isSaved property
  workplaceType: "On-site" | "Hybrid" | "Remote";
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  stats?: {
    views: number;
    applications: number;
    stars: number;
  };
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(job.isSaved || false); // Local state for saved status

  const handleSaveToggle = () => {
    setIsJobSaved((prev) => !prev);
    // In a real application, you would send an API request here to update the saved status
    console.log(`Job ${job.id} ${isJobSaved ? "unsaved" : "saved"}`);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow flex flex-col h-full mt-0">
        <CardContent className=" sm:p-6 flex-grow flex flex-col">
          <div className="flex items-start justify-between ">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 rounded-lg">
                <AvatarImage
                  src={job.companyLogo || "/placeholder.svg"}
                  alt={job.company}
                  className="object-contain"
                />
                <AvatarFallback className="rounded-lg text-sm">
                  {job.company
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-8 h-8"
                >
                  <Star className="w-4 h-4 text-gray-500" />
                  <span className="sr-only">Favorite</span>
                </Button>
                {job.isTrending && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-8 h-8"
                  >
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="sr-only">Trending</span>
                  </Button>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-8 h-8"
                >
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CardSubTitle className="mt-4 text-gray-700">
            {job.company}
          </CardSubTitle>

          <Link href={`/dashboard/jobs/${job.id}`} className="hover:underline">
            <CardTitle>{job.title}</CardTitle>
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-sm px-3 py-1">
              {job.type}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {job.workplaceType}
            </Badge>
            {job.salary && (
              <Badge
                variant="outline"
                className="text-sm px-3 py-1 color-primary"
              >
                <DollarSign className="w-4 h-4 mr-1" />
                {job.salary}
              </Badge>
            )}
          </div>

          <div className="space-y-2 text-gray-700 flex-grow">
            <div className="flex items-center text-sm">
              <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
              <span>{job.experience}-level</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>{job.postedAgo}</span>
            </div>
          </div>

          {/* Add this before the action buttons */}

          <div className="flex flex-row sm:flex-row items-start sm:items-center gap-2 mt-4">
            <Button variant={"outline"}>View Details</Button>
            <Button onClick={() => setIsApplyModalOpen(true)}>Apply Now</Button>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-between w-full border-t border-gray-100 pt-4 mt-0 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{job.stats?.views || 0} </span>
            </div>
            <div className="flex items-center space-x-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.stats?.applications || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{job.stats?.stars || 0}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={job.title}
      />
    </>
  );
}
