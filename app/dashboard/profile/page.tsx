"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, Users, MessageSquare, Heart, Edit, Settings, Share2, Trophy, PlusCircle, MoreHorizontal, Calendar, User, Info, Activity, ShoppingBag, Gift, FolderOpen, Network } from 'lucide-react'
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Add Skill type definition
interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  tags: string[];
  yearsOfExperience?: number;
  description?: string;
}

// Add Tab type definition
interface TabItem {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}


export default function ProfilePage() {
  // Placeholder data for experiences (display only)
  const experiences = [
    {
      id: "exp1",
      title: "Senior Product Designer",
      company: "Figma",
      period: "2022 - Present",
      description: "Leading design for core product features, managing design system, and mentoring junior designers.",
    },
    {
      id: "exp2",
      title: "Product Designer",
      company: "Stripe",
      period: "2020 - 2022",
      description: "Designed payment flows and dashboard experiences for small business customers.",
    },
    {
      id: "exp3",
      title: "UX Designer",
      company: "Airbnb",
      period: "2018 - 2020",
      description: "Worked on host onboarding and listing optimization features.",
    },
    {
      id: "exp4",
      title: "Junior Designer",
      company: "Startup X",
      period: "2017 - 2018",
      description: "Assisted in UI design for early-stage product.",
    },
  ]

  // Placeholder data for education (display only)
  const educationEntries = [
    {
      id: "edu1",
      degree: "Master of Design",
      school: "Stanford University",
      period: "2016 - 2018",
    },
    {
      id: "edu2",
      degree: "Bachelor of Arts in Graphic Design",
      school: "Rhode Island School of Design",
      period: "2012 - 2016",
    },
    {
      id: "edu3",
      degree: "High School Diploma",
      school: "Local High School",
      period: "2008 - 2012",
    },
  ]

  // Placeholder data for social links (display only)
  const socialLinks = [
    {
      id: "sl1",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/sarahchen",
      icon: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "sl2",
      platform: "GitHub",
      url: "https://github.com/sarahchen",
      icon: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "sl3",
      platform: "Twitter",
      url: "https://twitter.com/sarahchen_design",
      icon: "/placeholder.svg?height=24&width=24",
    },
  ]

  // Placeholder data for skills (display only)
  const skills: Skill[] = [
    {
      id: "skill1",
      name: "React",
      category: "frameworks-libraries",
      level: "expert",
      tags: ["Frontend", "JavaScript", "UI Development"],
      yearsOfExperience: 5,
      description: "Extensive experience building complex SPAs and design systems.",
    },
    {
      id: "skill2",
      name: "Python",
      category: "programming-languages",
      level: "advanced",
      tags: ["Backend", "Scripting", "Data Analysis"],
      yearsOfExperience: 7,
      description: "Used for backend services, data processing, and automation scripts.",
    },
    {
      id: "skill3",
      name: "Figma",
      category: "design",
      level: "expert",
      tags: ["UI/UX", "Prototyping", "Design Systems"],
      yearsOfExperience: 4,
      description: "Proficient in creating high-fidelity prototypes and collaborative design workflows.",
    },
  ]

  const tabItems = [
  { value: "overview", label: "Overview", icon: User },
  { value: "about", label: "About", icon: Info },
  { value: "posts", label: "Activities", icon: Activity },
  { value: "jobs", label: "Jobs", icon: Briefcase },
  { value: "listings", label: "Listings", icon: ShoppingBag },
  { value: "offers", label: "Offers", icon: Gift },
  { value: "portfolio", label: "Portfolio", icon: FolderOpen },
  { value: "communities", label: "Communities", icon: Users },
  { value: "events", label: "Events", icon: Calendar },
  { value: "connections", label: "Connections", icon: Network },
];

  const [visibleTabs, setVisibleTabs] = useState<TabItem[]>(tabItems.slice(0, 5)); // Show first 5 tabs
  const [overflowTabs, setOverflowTabs] = useState<TabItem[]>(tabItems.slice(5)); // Rest go to More dropdown

  // Use useEffect to set initial tabs based on screen size
  // Placeholder data for contact info (display only)
  const contactInfo = {
    email: "sarah@example.com",
    location: "San Francisco, CA",
    website: "sarahchen.design",
  }

  // Placeholder data for gamification
  const userRank = "Diamond III"

  // New placeholder data for communities and events
  const communitiesCreated = [
    { id: "comm1", name: "Design Systems Guild", members: 150, icon: "/placeholder.svg?height=24&width=24" },
    { id: "comm2", name: "Fintech Innovators", members: 300, icon: "/placeholder.svg?height=24&width=24" },
  ]

  const eventsCreated = [
    { id: "event1", name: "UX Workshop: Prototyping", date: "Oct 26, 2024", attendees: 50, icon: "/placeholder.svg?height=24&width=24" },
    { id: "event2", name: "Product Design Meetup", date: "Nov 15, 2024", attendees: 80, icon: "/placeholder.svg?height=24&width=24" },
  ]

  const [activeTab, setActiveTab] = useState("overview") // State to control active tab

  // Use useEffect to set initial tabs based on screen size
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let maxVisible = 5;
      
      if (screenWidth < 640) { // mobile
        maxVisible = 3;
      } else if (screenWidth < 768) { // tablet
        maxVisible = 4;
      } else if (screenWidth < 1024) { // small desktop
        maxVisible = 5;
      } else { // large desktop
        maxVisible = 6;
      }
      
      setVisibleTabs(tabItems.slice(0, maxVisible));
      setOverflowTabs(tabItems.slice(maxVisible));
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="w-full">
            <TabsList className="flex w-full gap-2 h-auto p-1 mb-4">
              {visibleTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                            className="flex-1 sm:flex-auto items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm sm:text-base"
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}

              {overflowTabs.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center px-3 py-2 h-auto">
                      <MoreHorizontal className="w-4 h-4" />
                      <span className="ml-1">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {overflowTabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <DropdownMenuItem
                          key={tab.value}
                          onClick={() => setActiveTab(tab.value)}
                          className={`cursor-pointer flex items-center gap-2 ${activeTab === tab.value ? 'text-black font-medium' : ''}`}
                        >
                          <IconComponent className="w-4 h-4" />
                          {tab.label}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
       

              {/* Experience  Overview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Experience  ({experiences.length})</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("jobs")}>
                    View More
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experiences.slice(0, 2).map((job) => ( // Show first 2 jobs
                    <div key={job.id} className="flex items-start space-x-3">
                      <Briefcase className="w-5 h-5 text-gray-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-base">{job.title} at {job.company}</h3>
                        <p className="text-sm text-gray-500">{job.period}</p>
                      </div>
                    </div>
                  ))}
                  {experiences.length === 0 && <p className="text-sm text-gray-500">No experience added yet.</p>}
                </CardContent>
              </Card>

              {/* Education  Overview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Education  ({educationEntries.length})</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("about")}>
                    View More
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {educationEntries.slice(0, 2).map((edu) => ( // Show first 2 education entries
                    <div key={edu.id} className="flex items-start space-x-3">
                      <GraduationCap className="w-5 h-5 text-gray-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-base">{edu.degree} from {edu.school}</h3>
                        <p className="text-sm text-gray-500">{edu.period}</p>
                      </div>
                    </div>
                  ))}
                  {educationEntries.length === 0 && <p className="text-sm text-gray-500">No education added yet.</p>}
                </CardContent>
              </Card>

              {/* Recent Activity - MOVED HERE */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      type: "post",
                      action: "shared a post about design systems",
                      time: "2 hours ago",
                      engagement: "24 likes, 8 comments",
                    },
                    {
                      type: "event",
                      action: "attended Tech Networking Mixer",
                      time: "1 day ago",
                      engagement: "Connected with 5 new people",
                    },
                    {
                      type: "discussion",
                      action: "replied to 'Best practices for remote work'",
                      time: "3 days ago",
                      engagement: "12 likes on reply",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">Sarah {activity.action}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>{activity.time}</span>
                          <span>•</span>
                          <span>{activity.engagement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Communities Created Overview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Communities Created ({communitiesCreated.length})</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("communities")}>
                    View More
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communitiesCreated.slice(0, 2).map((community) => ( // Show first 2 communities
                    <div key={community.id} className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-gray-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-base">{community.name}</h3>
                        <p className="text-sm text-gray-500">{community.members} members</p>
                        {/* Add more community details if available */}
                      </div>
                    </div>
                  ))}
                  {communitiesCreated.length === 0 && <p className="text-sm text-gray-500">No communities created yet.</p>}
                </CardContent>
              </Card>

              {/* Events Created Overview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Events Created ({eventsCreated.length})</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("events")}>
                    View More
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {eventsCreated.slice(0, 2).map((event) => ( // Show first 2 events
                    <div key={event.id} className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-gray-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-base">{event.name}</h3>
                        <p className="text-sm text-gray-500">{event.date} • {event.attendees} attendees</p>
                      </div>
                    </div>
                  ))}
                  {eventsCreated.length === 0 && <p className="text-sm text-gray-500">No events created yet.</p>}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>About</CardTitle>
                    {/* Edit button for About section, can link to a general profile edit in settings */}
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("settings")}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Passionate product designer with 8+ years of experience creating user-centered digital experiences.
                    I specialize in design systems, user research, and cross-functional collaboration. Currently leading
                    design for consumer products at a fast-growing fintech startup.
                  </p>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Education</CardTitle>
                    <Link href="/profile/education">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {educationEntries.map((edu) => (
                    <div key={edu.id} className="flex space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-500">{edu.period}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Skills</CardTitle>
                    <Link href="/profile/skills">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {skill.level} in {skill.category.replace(/-/g, ' ')}
                          {skill.yearsOfExperience ? ` (${skill.yearsOfExperience} years)` : ''}
                        </p>
                        {skill.description && <p className="text-sm text-gray-700 mt-1">{skill.description}</p>}
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {skill.level}
                          </Badge>
                          {skill.tags.map((tag: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Jobs Tab (Full Experience List) */}
            <TabsContent value="jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My Jobs</CardTitle>
                    <Link href="/profile/experience">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {experiences.map((job) => (
                    <div key={job.id} className="flex space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500 mb-2">{job.period}</p>
                        <p className="text-sm text-gray-700">{job.description}</p>
                      </div>
                    </div>
                  ))}
                  {experiences.length === 0 && <p className="text-sm text-gray-500">No jobs added yet.</p>}
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Listings Tab */}
            <TabsContent value="listings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Listings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">This section will display your job listings, services, or products.</p>
                  <Button variant="outline">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Listing
                  </Button>
                  {/* Placeholder for listings content */}
                  <div className="mt-4 text-sm text-gray-500">
                    <p>No listings found. Start by adding your first listing!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Offers Tab */}
            <TabsContent value="offers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Offers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">This section will display job offers, collaboration proposals, or other opportunities.</p>
                  {/* Placeholder for offers content */}
                  <div className="mt-4 text-sm text-gray-500">
                    <p>No offers received yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Portfolio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Showcase your projects, designs, or creative works here.</p>
                  <Button variant="outline">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Project
                  </Button>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>No portfolio items added yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">View reviews and testimonials from clients or collaborators.</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>No reviews received yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communities Tab (Full List) */}
            <TabsContent value="communities" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My Communities</CardTitle>
                    <Link href="/profile/communities"> {/* Placeholder link */}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {communitiesCreated.map((community) => (
                    <div key={community.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{community.name}</h3>
                        <p className="text-gray-600">{community.members} members</p>
                        {/* Add more community details if available */}
                      </div>
                    </div>
                  ))}
                  {communitiesCreated.length === 0 && <p className="text-sm text-gray-500">No communities created yet.</p>}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab (Full List) */}
            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My Events</CardTitle>
                    <Link href="/profile/events"> {/* Placeholder link */}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {eventsCreated.map((event) => (
                    <div key={event.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        <p className="text-sm text-gray-500">{event.date} • {event.attendees} attendees</p>
                      </div>
                    </div>
                  ))}
                  {eventsCreated.length === 0 && <p className="text-sm text-gray-500">No events created yet.</p>}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              {/* User Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>My Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      content:
                        "Just finished redesigning our mobile app's onboarding flow. Key insight: users want to see value before providing personal information. Reduced drop-off by 40%! 🎉",
                      time: "2 days ago",
                      likes: 45,
                      comments: 12,
                      shares: 8,
                    },
                    {
                      content:
                        "Sharing my latest article: 'Building Inclusive Design Systems'. It covers accessibility considerations, color contrast, and inclusive language. Link in comments!",
                      time: "1 week ago",
                      likes: 67,
                      comments: 23,
                      shares: 15,
                    },
                  ].map((post, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.comments}
                          </span>
                          <span className="flex items-center">
                            <Share2 className="w-4 h-4 mr-1" />
                            {post.shares}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{post.time}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connections" className="space-y-6">
              {/* Connections */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        name: "Marcus Johnson",
                        role: "Full Stack Developer",
                        company: "Stripe",
                        avatar: "/placeholder.svg?height=40&width=40",
                        mutualConnections: 12,
                      },
                      {
                        name: "Elena Rodriguez",
                        role: "Data Scientist",
                        company: "Netflix",
                        avatar: "/placeholder.svg?height=40&width=40",
                        mutualConnections: 8,
                      },
                      {
                        name: "David Kim",
                        role: "Product Manager",
                        company: "Google",
                        avatar: "/placeholder.svg?height=40&width=40",
                        mutualConnections: 15,
                      },
                      {
                        name: "Jennifer Walsh",
                        role: "Senior Engineer",
                        company: "Meta",
                        avatar: "/placeholder.svg?height=40&width=40",
                        mutualConnections: 6,
                      },
                    ].map((connection, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Avatar>
                          <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                          <AvatarFallback>
                            {connection.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{connection.name}</h4>
                          <p className="text-xs text-gray-600">
                            {connection.role} at {connection.company}
                          </p>
                          <p className="text-xs text-gray-500">{connection.mutualConnections} mutual connections</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Message
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Manage your basic profile information.</p>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit General Profile Info
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info - MOVED HERE */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Contact Info</CardTitle>
                    <Link href="/profile/contact-info">
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">{contactInfo.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{contactInfo.location}</p>
                    </div>
                    <div>
                      <p className="font-medium">Website</p>
                      <p className="text-gray-600">{contactInfo.website}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links - MOVED HERE */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Social Links</CardTitle>
                    <Link href="/profile/social-links">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {socialLinks.map((link) => (
                      <div key={link.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                          {/* Using a generic placeholder for the icon, as Lucide doesn't have all social icons directly */}
                          <img src={link.icon || "/placeholder.svg"} alt={link.platform} className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{link.platform}</p>
                          <p className="text-xs text-gray-500">{link.url.replace(/(^\w+:|^)\/\//, '')}</p>
                        </div>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Strength</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>All-Star</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>✅ Profile Photo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>✅ Work Experience</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>✅ Skills & Endorsements</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>❌ Portfolio Projects</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Gamification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gamification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="font-semibold text-sm">Current Rank</p>
                  <p className="text-lg font-bold text-gray-800">{userRank}</p>
                </div>
              </div>
              {/* Add more gamification elements here if needed */}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "Top Contributor", description: "Most helpful posts this month", icon: "🏆" },
                  { title: "Community Builder", description: "Connected 100+ members", icon: "🤝" },
                  { title: "Event Organizer", description: "Hosted 5 successful events", icon: "🎪" },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <p className="font-semibold text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
