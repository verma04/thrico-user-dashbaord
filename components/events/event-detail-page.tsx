"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, DollarSign, Clock, Share2, Bookmark, ChevronLeft } from "lucide-react"
import type { Job } from "./events-list"
import { EventsCard } from "./event-card"
import { ApplyJobModal } from "./apply-job-modal"
import Link from "next/link"

interface JobDetailPageProps {
  job: Job
  similarJobs: Job[]
}

const JobDetailPage = ({ job, similarJobs }: JobDetailPageProps) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isJobSaved, setIsJobSaved] = useState(job.isSaved || false) // Local state for saved status

  const handleSaveToggle = () => {
    setIsJobSaved((prev) => !prev)
    // In a real application, you would send an API request here to update the saved status
    console.log(`Job ${job.id} ${isJobSaved ? "unsaved" : "saved"}`)
  }

  return (
    <>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/jobs" className="flex items-center text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Job Board
          </Link>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 rounded-lg">
                    <AvatarImage
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={job.company}
                      className="object-contain"
                    />
                    <AvatarFallback className="rounded-lg text-lg">
                      {job.company
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg text-gray-600">{job.company}</p>
                    <h1 className="font-bold text-2xl sm:text-3xl">{job.title}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {job.workplaceType}
                      </Badge>
                      {job.salary && (
                        <Badge variant="outline" className="text-sm px-3 py-1">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button className="w-full sm:w-auto" onClick={() => setIsApplyModalOpen(true)}>
                    Apply Now
                  </Button>
                  <Button
                    variant={isJobSaved ? "default" : "outline"} // Change variant if saved
                    className={`w-full sm:w-auto ${isJobSaved ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-transparent"}`}
                    onClick={handleSaveToggle}
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    {isJobSaved ? "Saved" : "Save Job"}
                  </Button>
                  <Button variant="ghost" size="icon" className="w-10 h-10 sm:w-auto sm:px-3 sm:py-1 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    <span className="sr-only sm:not-sr-only sm:ml-2">Share</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mt-6 border-t pt-4">
                <div className="flex items-center text-base">
                  <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{job.experience}-level</span>
                </div>
                <div className="flex items-center text-base">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-base">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Posted {job.postedAgo}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Job Description</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                {job.description}
              </CardContent>
            </Card>

            {job.requirements && job.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {job.responsibilities && job.responsibilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.responsibilities.map((res, index) => (
                      <li key={index}>{res}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">About {job.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-base">
                  {job.company} is a leading company in the {job.category} sector, committed to innovation and employee
                  growth. We foster a collaborative environment where talent thrives.
                </p>
                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  View Company Profile
                </Button>
              </CardContent>
            </Card>

            {similarJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {similarJobs.map((similarJob) => (
                    <EventsCard key={similarJob.id} job={similarJob} />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <ApplyJobModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} jobTitle={job.title} />
    </>
  )
}

export default JobDetailPage
