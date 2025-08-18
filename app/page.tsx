import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Users, Briefcase, Star, ArrowRight, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900 nav-text">Thrico</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#events" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Events
              </Link>
              <Link href="#groups" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Groups
              </Link>
              <Link href="#jobs" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Jobs
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 nav-text-small">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Contact
              </Link>
              <Link href="/news" className="text-gray-600 hover:text-gray-900 nav-text-small">
                News
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="button-text-small">Sign In</Button>
              <Button asChild className="button-text-small">
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-h1 md:text-6xl text-white mb-6">
                Build Your Community,
                <span className="text-yellow-300"> Together</span>
              </h1>
              <p className="body-text text-blue-100 mb-8">
                Connect, collaborate, and grow with like-minded individuals. Join thousands of professionals building
                meaningful relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 button-text">
                  Join Community
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent button-text"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Community illustration"
                width={500}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">Upcoming Events</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">
              Don't miss out on exciting networking opportunities and learning experiences
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Tech Networking Mixer",
                date: "Dec 15, 2024",
                time: "6:00 PM",
                location: "San Francisco, CA",
                attendees: 45,
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Startup Pitch Night",
                date: "Dec 18, 2024",
                time: "7:00 PM",
                location: "New York, NY",
                attendees: 32,
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Design Workshop",
                date: "Dec 22, 2024",
                time: "2:00 PM",
                location: "Austin, TX",
                attendees: 28,
                image: "/placeholder.svg?height=200&width=300",
              },
            ].map((event, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="heading-h4">{event.title}</CardTitle>
                  <div className="flex items-center label-text text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center label-text text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <Badge variant="secondary" className="label-text-small">{event.attendees} attending</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Groups */}
      <section id="groups" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">Popular Groups</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">
              Join communities that match your interests and professional goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Frontend Developers", members: 1250, category: "Technology", color: "bg-blue-500" },
              { name: "Product Managers", members: 890, category: "Business", color: "bg-green-500" },
              { name: "UX Designers", members: 756, category: "Design", color: "bg-purple-500" },
              { name: "Data Scientists", members: 634, category: "Analytics", color: "bg-orange-500" },
            ].map((group, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div
                    className={`w-16 h-16 ${group.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                  >
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="heading-h4">{group.name}</CardTitle>
                  <CardDescription className="body-text-small">{group.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="metric-medium text-gray-900 mb-2">{group.members.toLocaleString()}</p>
                  <p className="label-text text-gray-600 mb-4">members</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent button-text-small">
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Members */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">Latest Members</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">Welcome our newest community members</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Product Designer",
                company: "Figma",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "Marcus Johnson",
                role: "Full Stack Developer",
                company: "Stripe",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "Elena Rodriguez",
                role: "Data Scientist",
                company: "Netflix",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "David Kim",
                role: "Product Manager",
                company: "Google",
                avatar: "/placeholder.svg?height=80&width=80",
              },
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="heading-h4">{member.name}</CardTitle>
                  <CardDescription className="body-text-small">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="label-text text-gray-600 mb-4">{member.company}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent button-text-small">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Members Say */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">What Members Say About Us</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">Hear from our community members about their experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Thrico has transformed how I network professionally. The quality of connections and events is outstanding.",
                author: "Jennifer Walsh",
                role: "Senior Engineer at Meta",
                rating: 5,
              },
              {
                quote:
                  "I've found my dream job through connections made on Thrico. The community is incredibly supportive.",
                author: "Alex Thompson",
                role: "Product Manager at Airbnb",
                rating: 5,
              },
              {
                quote:
                  "The events are well-organized and the platform makes it easy to stay connected with my professional network.",
                author: "Maria Santos",
                role: "UX Director at Adobe",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">"{testimonial.quote}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarFallback>
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Opportunities */}
      <section id="jobs" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover exciting career opportunities from our community partners
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
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
            ].map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-blue-600">{job.company}</CardDescription>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {job.salary}
                    </div>
                    <p className="text-sm text-gray-500">Posted {job.posted}</p>
                  </div>
                  <Button className="w-full">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold">Thrico</span>
              </div>
              <p className="text-gray-400 mb-4">
                Building meaningful professional communities, one connection at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Groups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Members
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-white">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Thrico. All rights reserved. | Powered by{" "}
              <span className="text-blue-400 font-semibold">Thrico</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
