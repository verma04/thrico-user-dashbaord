import React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

const jobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "2 days ago",
  },
  {
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $170k",
    posted: "1 week ago",
  },
  {
    title: "UX Designer",
    company: "DesignStudio",
    location: "Austin, TX",
    type: "Contract",
    salary: "$80k - $100k",
    posted: "3 days ago",
  },
  {
    title: "Data Scientist",
    company: "DataCorp",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140k - $180k",
    posted: "5 days ago",
  },
  {
    title: "Data Scientist",
    company: "DataCorp",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140k - $180k",
    posted: "5 days ago",
  },
];

const JobIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "Full-time":
      return <Briefcase className="h-5 w-5 text-primary" />;
    case "Contract":
      return <MapPin className="h-5 w-5  text-primary" />;
    default:
      return <Briefcase className="h-5 w-5  text-primary" />;
  }
};

export default function JobOpportunities() {
  return (
    <section id="jobs" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Job Opportunities
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exciting career opportunities from our community partners
          </p>
        </div>
        <BentoGrid className="max-w-4xl mx-auto">
          {jobs.map((job, i) => (
            <BentoGridItem
              key={i}
              title={job.title}
              description={
                <div>
                  <div className="font-medium text-primary">{job.company}</div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1 color-primary" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Briefcase className="w-4 h-4 mr-1 color-primary" />
                    {job.salary}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Posted {job.posted}
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    {job.type}
                  </Badge>
                </div>
              }
              header={
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mb-2">
                  <JobIcon type={job.type} />
                </div>
              }
              icon={<ArrowRight className="h-4 w-4 text-neutral-500" />}
              className={i === 3 ? "md:col-span-2" : ""}
              footer={
                <Button className="w-full mt-4">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              }
            />
          ))}
        </BentoGrid>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
}
