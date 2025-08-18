"use client"

import { JobCard } from "./job-card"
import { Button } from "@/components/ui/button"

import { JobFilterState } from "./job-filter-modal"

export interface Job {
  id: number
  title: string
  company: string
  companyLogo: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  experience: "Entry-level" | "Mid-level" | "Senior" | "Executive" | "Lead"
  salary?: string
  description: string
  postedAgo: string
  category: string
  isFeatured?: boolean
  isTrending?: boolean
  isSaved?: boolean // Added isSaved property
  isMyJob?: boolean
  isApplied?: boolean
  workplaceType: "On-site" | "Hybrid" | "Remote"
  activityScore?: number // For trending
  createdAt?: string // For new/discover
  requirements?: string[]
  responsibilities?: string[]
  benefits?: string[]
}

interface JobsListProps {
  currentTab: string
  filters?: JobFilterState
}

export const allJobs: Job[] = [
  {
    id: 1,
    title: "Network Engineer",
    company: "Tata Communications",
    companyLogo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Job%20card%20-%20fav%20%26%20Trend-paJBwdUjgRFcT36bZfuW3jpc3cYlB0.png", // Using the provided image URL
    location: "Mumbai, Maharashtra, India",
    type: "Full-time",
    experience: "Senior",
    salary: "₹7-10 LPA",
    description:
      "We are seeking a highly skilled Network Engineer to design, implement, and maintain our network infrastructure. The ideal candidate will have strong experience with routing, switching, and network security. This role involves working with cutting-edge technologies and collaborating with a global team to ensure robust and scalable network solutions. You will be responsible for troubleshooting complex network issues, implementing security protocols, and optimizing network performance.",
    postedAgo: "48 mins ago",
    category: "IT",
    isTrending: true,
    isSaved: true, // Marked as saved
    workplaceType: "On-site",
    activityScore: 120,
    createdAt: "2025-08-05T12:00:00Z",
    requirements: [
      "Bachelor's degree in Computer Science, IT, or related field.",
      "5+ years of experience in network engineering.",
      "Strong knowledge of TCP/IP, routing protocols (BGP, OSPF), and switching.",
      "Experience with firewalls, VPNs, and network security best practices.",
      "Certifications like CCNA, CCNP, or equivalent are a plus.",
    ],
    responsibilities: [
      "Design, implement, and maintain network infrastructure.",
      "Monitor network performance and ensure system availability and reliability.",
      "Configure and install various network devices and services (e.g., routers, switches, firewalls, load balancers).",
      "Perform network troubleshooting to isolate and diagnose common network problems.",
      "Secure network systems by establishing and enforcing policies; defining and monitoring access.",
    ],
    benefits: [
      "Competitive salary and performance bonuses.",
      "Comprehensive health, dental, and vision insurance.",
      "Generous paid time off and holidays.",
      "Professional development opportunities and certification support.",
      "Flexible work arrangements (where applicable).",
    ],
  },
  {
    id: 2,
    title: "Senior Frontend Engineer (React)",
    company: "Tech Solutions Inc.",
    companyLogo: "/placeholder.svg?height=64&width=64&text=TS",
    location: "Remote (US)",
    type: "Full-time",
    experience: "Senior",
    salary: "$120k - $150k",
    description:
      "We are looking for a highly skilled Senior Frontend Engineer with extensive experience in React, Next.js, and TypeScript to join our dynamic team. You will be responsible for developing and maintaining user-facing applications, ensuring high performance and responsiveness. This role involves working on complex user interfaces, collaborating with backend teams, and contributing to architectural decisions.",
    postedAgo: "2 days ago",
    category: "Software Dev",
    isFeatured: true,
    isTrending: true,
    workplaceType: "Remote",
    activityScore: 150,
    createdAt: "2025-08-03T10:00:00Z",
    requirements: [
      "Bachelor's degree in Computer Science or related field.",
      "5+ years of experience with React.js and its ecosystem.",
      "Proficiency in TypeScript, HTML5, and CSS3.",
      "Experience with Next.js, Redux, and modern build tools.",
      "Strong understanding of responsive design and cross-browser compatibility.",
    ],
    responsibilities: [
      "Develop and maintain high-quality user interfaces using React and Next.js.",
      "Collaborate with product and design teams to translate UI/UX designs into code.",
      "Optimize applications for maximum speed and scalability.",
      "Write clean, maintainable, and well-documented code.",
      "Participate in code reviews and contribute to team best practices.",
    ],
    benefits: [
      "Fully remote work environment.",
      "Flexible working hours.",
      "Unlimited PTO.",
      "Health and wellness stipends.",
      "Annual professional development budget.",
    ],
  },
  {
    id: 3,
    title: "Product Designer (UI/UX)",
    company: "Creative Minds Studio",
    companyLogo: "/placeholder.svg?height=64&width=64&text=CM",
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$90k - $110k",
    description:
      "Join our innovative design team to create intuitive and beautiful user experiences. You will work closely with product managers and engineers to bring ideas from concept to reality, focusing on user research, wireframing, prototyping, and visual design. We value creativity, user-centric thinking, and a collaborative spirit.",
    postedAgo: "5 days ago",
    category: "Design",
    isSaved: true, // Marked as saved
    workplaceType: "On-site",
    activityScore: 80,
    createdAt: "2025-07-31T14:30:00Z",
    requirements: [
      "Bachelor's degree in Design, HCI, or a related field.",
      "3+ years of experience in UI/UX design.",
      "Proficiency with design tools like Figma, Sketch, or Adobe XD.",
      "Strong portfolio showcasing user-centered design solutions.",
      "Experience with user research methodologies and usability testing.",
    ],
    responsibilities: [
      "Conduct user research and analyze user feedback.",
      "Create wireframes, storyboards, user flows, and site maps.",
      "Design UI elements and tools such as navigation menus, search boxes, tabs, and widgets.",
      "Develop and maintain design systems and style guides.",
      "Collaborate with cross-functional teams throughout the product development lifecycle.",
    ],
    benefits: [
      "Creative and collaborative work environment.",
      "Health and dental insurance.",
      "Paid time off.",
      "Opportunities for career growth.",
      "Company-sponsored workshops and conferences.",
    ],
  },
  {
    id: 4,
    title: "Marketing Specialist (Digital)",
    company: "Global Growth Agency",
    companyLogo: "/placeholder.svg?height=64&width=64&text=GG",
    location: "Remote (Global)",
    type: "Full-time",
    experience: "Entry-level",
    salary: "$60k - $75k",
    description:
      "We are seeking a passionate Digital Marketing Specialist to manage and optimize our online marketing campaigns. Responsibilities include SEO, SEM, social media management, content creation, and performance analysis. You will play a key role in driving brand awareness and lead generation across various digital channels.",
    postedAgo: "1 week ago",
    category: "Marketing",
    isMyJob: true, // Example of a job posted by "My Jobs" user
    workplaceType: "Remote",
    activityScore: 60,
    createdAt: "2025-07-29T09:00:00Z",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field.",
      "1+ year of experience in digital marketing.",
      "Familiarity with SEO, SEM, and social media platforms.",
      "Excellent written and verbal communication skills.",
      "Ability to analyze data and generate reports.",
    ],
    responsibilities: [
      "Develop and implement digital marketing strategies.",
      "Manage social media accounts and create engaging content.",
      "Optimize website content for SEO and lead generation.",
      "Run and monitor paid advertising campaigns.",
      "Track and report on campaign performance.",
    ],
    benefits: [
      "Flexible remote work.",
      "Performance-based bonuses.",
      "Access to online marketing courses and tools.",
      "Team-building events.",
      "Opportunity to work with diverse clients.",
    ],
  },
  {
    id: 5,
    title: "Backend Developer (Node.js)",
    company: "DataFlow Systems",
    companyLogo: "/placeholder.svg?height=64&width=64&text=DF",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$100k - $130k",
    description:
      "Build robust and scalable backend services using Node.js, Express, and PostgreSQL. You will be part of a team that designs, develops, and maintains our core API services and database infrastructure. We are looking for someone who is passionate about clean code, performance, and building reliable systems.",
    postedAgo: "3 days ago",
    category: "Software Dev",
    isApplied: true, // Example of a job the user applied to
    workplaceType: "Hybrid",
    activityScore: 100,
    createdAt: "2025-08-02T16:00:00Z",
    requirements: [
      "Bachelor's degree in Computer Science or equivalent.",
      "3+ years of experience with Node.js and Express.",
      "Proficiency in SQL and experience with PostgreSQL.",
      "Familiarity with RESTful APIs and microservices architecture.",
      "Experience with cloud platforms (AWS, Azure, GCP) is a plus.",
    ],
    responsibilities: [
      "Design, develop, and maintain scalable backend services.",
      "Write efficient, reusable, and testable code.",
      "Collaborate with frontend developers to integrate user-facing elements.",
      "Implement security and data protection measures.",
      "Participate in database design and optimization.",
    ],
    benefits: [
      "Hybrid work model.",
      "Competitive salary and equity options.",
      "Comprehensive health benefits.",
      "401(k) matching.",
      "Generous vacation policy.",
    ],
  },
  {
    id: 6,
    title: "HR Coordinator",
    company: "PeopleFirst Solutions",
    companyLogo: "/placeholder.svg?height=64&width=64&text=PF",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Entry-level",
    salary: '$50k - "$65k',
    description:
      "Support our human resources department with various administrative tasks, including recruitment, onboarding, employee relations, and HR policy implementation. Excellent communication skills are a must. This role is crucial for maintaining a positive and productive work environment.",
    postedAgo: "4 days ago",
    category: "HR",
    workplaceType: "On-site",
    activityScore: 40,
    createdAt: "2025-08-01T11:00:00Z",
    requirements: [
      "Bachelor's degree in Human Resources or related field.",
      "1+ year of experience in an HR support role.",
      "Strong organizational and communication skills.",
      "Proficiency with HRIS systems and MS Office Suite.",
      "Ability to handle confidential information with discretion.",
    ],
    responsibilities: [
      "Assist with recruitment processes, including posting jobs and scheduling interviews.",
      "Onboard new employees and ensure all paperwork is completed.",
      "Maintain employee records and HR databases.",
      "Support HR team with various administrative tasks.",
      "Respond to employee inquiries regarding HR policies and benefits.",
    ],
    benefits: [
      "Health, dental, and vision insurance.",
      "Paid time off.",
      "Employee assistance program.",
      "Opportunities for professional growth in HR.",
      "Friendly and supportive work environment.",
    ],
  },
]

export function JobsList({ currentTab, filters }: JobsListProps) {
  const getFilteredJobs = () => {
    let jobs = [...allJobs]

    // First filter by tab
    switch (currentTab) {
      case "discover":
        // All jobs by default
        break
      case "trending":
        jobs = jobs.filter((job) => job.isTrending)
        jobs.sort((a, b) => (b.activityScore || 0) - (a.activityScore || 0))
        break
      case "featured":
        jobs = jobs.filter((job) => job.isFeatured)
        break
      case "my-jobs":
        jobs = jobs.filter((job) => job.isMyJob)
        break
      case "applied":
        jobs = jobs.filter((job) => job.isApplied)
        break
      case "saved":
        jobs = jobs.filter((job) => job.isSaved)
        break
      default:
        break
    }

    // Apply filters if provided
    if (filters) {
      // Search text filter
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase()
        jobs = jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower) ||
            job.description.toLowerCase().includes(searchLower) ||
            job.category.toLowerCase().includes(searchLower)
        )
      }

      // Job type filter
      if (filters.jobTypes.length > 0) {
        jobs = jobs.filter((job) => 
          filters.jobTypes.some(type => 
            job.type.toLowerCase().replace('-', '') === type.toLowerCase().replace('-', '')
          )
        )
      }

      // Experience level filter
      if (filters.experienceLevels.length > 0) {
        jobs = jobs.filter((job) => 
          filters.experienceLevels.some(level => {
            const jobExp = job.experience.toLowerCase()
            if (level === 'entry' && jobExp.includes('entry')) return true
            if (level === 'mid' && jobExp.includes('mid')) return true
            if (level === 'senior' && jobExp.includes('senior')) return true
            if (level === 'lead' && (jobExp.includes('lead') || jobExp.includes('executive'))) return true
            if (level === 'executive' && jobExp.includes('executive')) return true
            return false
          })
        )
      }

      // Category filter
      if (filters.categories.length > 0) {
        jobs = jobs.filter((job) => 
          filters.categories.some(cat => 
            job.category.toLowerCase().includes(cat.toLowerCase().replace('-', ' '))
          )
        )
      }

      // Location filter
      if (filters.locations.length > 0) {
        jobs = jobs.filter((job) => 
          filters.locations.some(loc => 
            job.location.toLowerCase().includes(loc.toLowerCase())
          )
        )
      }

      // Remote filter
      if (filters.remote) {
        jobs = jobs.filter((job) => job.workplaceType === "Remote")
      }

      // Sort by filter
      switch (filters.sortBy) {
        case "newest":
          jobs.sort((a, b) => new Date(b.createdAt || b.postedAgo).getTime() - new Date(a.createdAt || a.postedAgo).getTime())
          break
        case "salary":
          jobs.sort((a, b) => {
            const getSalaryNum = (salary?: string) => {
              if (!salary) return 0
              const nums = salary.match(/\d+/g)
              return nums ? parseInt(nums[nums.length - 1]) : 0
            }
            return getSalaryNum(b.salary) - getSalaryNum(a.salary)
          })
          break
        case "company":
          jobs.sort((a, b) => a.company.localeCompare(b.company))
          break
        case "relevance":
        default:
          // Keep original order for relevance
          break
      }
    }

    return jobs
  }

  const filteredJobs = getFilteredJobs()

  const getEmptyStateMessage = () => {
    switch (currentTab) {
      case "trending":
        return {
          title: "No trending jobs right now",
          description: "Check back later for popular job openings!",
        }
      case "featured":
        return {
          title: "No featured jobs available",
          description: "Stay tuned for exciting featured opportunities!",
        }
      case "my-jobs":
        return {
          title: "You haven't posted any jobs yet",
          description: "Start by posting your first job opening!",
        }
      case "applied":
        return {
          title: "You haven't applied to any jobs yet",
          description: "Explore job listings and apply to your next role!",
        }
      case "saved": // Empty state for saved jobs
        return {
          title: "No saved jobs found",
          description: "Save jobs you're interested in to view them here!",
        }
      default:
        return {
          title: "No jobs found",
          description: "Try adjusting your filters or search terms.",
        }
    }
  }

  if (filteredJobs.length === 0) {
    const emptyState = getEmptyStateMessage()
    return (
      <div className="text-center py-8 md:py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{emptyState.title}</h3>
          <p className="text-sm md:text-base text-gray-600 mb-4">{emptyState.description}</p>
          {currentTab === "my-jobs" && <Button className="w-full sm:w-auto">Post a New Job</Button>}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      <div className="col-span-full text-center mt-6">
        <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
          Load More Jobs
        </Button>
      </div>
    </div>
  )
}
