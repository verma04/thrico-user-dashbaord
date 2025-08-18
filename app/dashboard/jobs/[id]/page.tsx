"use client"
import JobDetailPage from "@/components/jobs/job-detail-page"
import { allJobs } from "@/components/jobs/jobs-list"
import { notFound } from "next/navigation"
// Import allJobs for data fetching

interface JobPageProps {
  params: {
    id: string
  }
}

export default function JobPage({ params }: JobPageProps) {
  const jobId = Number.parseInt(params.id)
  const job = allJobs.find((j) => j.id === jobId)

  if (!job) {
    notFound()
  }

  // Filter similar jobs (excluding the current job)
  const similarJobs = allJobs.filter((j) => j.id !== jobId && j.category === job.category).slice(0, 3) // Get up to 3 similar jobs

  return <JobDetailPage job={job} similarJobs={similarJobs} />
}
