import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Heart, Target, Award, Globe, Lightbulb } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
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
              <Link href="/" className="text-xl font-bold text-gray-900 nav-text">Thrico</Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#events" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Events
              </Link>
              <Link href="/#groups" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Groups
              </Link>
              <Link href="/#jobs" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Jobs
              </Link>
              <Link href="/about" className="text-blue-600 hover:text-blue-700 nav-text-small font-medium">
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-h1 md:text-6xl text-white mb-6">
              About <span className="text-yellow-300">Thrico</span>
            </h1>
            <p className="body-text text-blue-100 mb-8 text-lg">
              We're building the future of professional networking and community engagement, 
              connecting passionate individuals to create meaningful relationships and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-h2 text-gray-900 mb-6">Our Mission</h2>
              <p className="body-text text-gray-600 mb-6">
                At Thrico, we believe that meaningful connections drive innovation and success. 
                Our mission is to create a platform where professionals can discover opportunities, 
                share knowledge, and build lasting relationships that accelerate their careers and personal growth.
              </p>
              <p className="body-text text-gray-600">
                We're committed to fostering inclusive communities where diversity is celebrated, 
                ideas flourish, and every member can reach their full potential.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Team collaboration"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">Our Core Values</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape the community we're building together
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community First",
                description: "We prioritize the needs and success of our community members above all else."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Authentic Connections",
                description: "We foster genuine relationships built on trust, respect, and shared values."
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Innovation",
                description: "We continuously evolve our platform to meet the changing needs of professionals."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Inclusivity",
                description: "We welcome and celebrate diversity in all its forms, creating space for everyone."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Purpose-Driven",
                description: "Every feature and decision is made with our members' success and growth in mind."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Excellence",
                description: "We strive for the highest quality in everything we deliver to our community."
              }
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600">
                    {value.icon}
                  </div>
                  <CardTitle className="heading-h4">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text-small text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">Meet Our Team</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Thrico, dedicated to building the future of professional networking
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Co-Founder",
                bio: "Former VP of Product at LinkedIn with 10+ years in community building.",
                avatar: "/placeholder.svg?height=120&width=120"
              },
              {
                name: "Michael Chen",
                role: "CTO & Co-Founder",
                bio: "Ex-Google engineer passionate about scalable systems and user experience.",
                avatar: "/placeholder.svg?height=120&width=120"
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Community",
                bio: "Community engagement expert with background in event management and social impact.",
                avatar: "/placeholder.svg?height=120&width=120"
              },
              {
                name: "David Park",
                role: "Lead Designer",
                bio: "Design thinking advocate focused on creating inclusive and accessible experiences.",
                avatar: "/placeholder.svg?height=120&width=120"
              }
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="heading-h4">{member.name}</CardTitle>
                  <CardDescription className="body-text-small font-medium text-blue-600">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="body-text-small text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-white mb-4">Our Impact</h2>
            <p className="body-text text-blue-100 max-w-2xl mx-auto">
              See how we're making a difference in the professional community
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Members" },
              { number: "1,200+", label: "Events Hosted" },
              { number: "15K+", label: "Connections Made" },
              { number: "98%", label: "Member Satisfaction" }
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-yellow-300 mb-2">{stat.number}</p>
                <p className="body-text text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-h2 text-gray-900 mb-4">Ready to Join Our Community?</h2>
          <p className="body-text text-gray-600 mb-8 max-w-2xl mx-auto">
            Become part of a thriving professional network where opportunities and meaningful connections await.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="button-text">
              <Link href="/dashboard">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="button-text">
              <Link href="/contact">Contact Us</Link>
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
                <li><Link href="/#events" className="hover:text-white">Events</Link></li>
                <li><Link href="/#groups" className="hover:text-white">Groups</Link></li>
                <li><Link href="/#jobs" className="hover:text-white">Jobs</Link></li>
                <li><Link href="/#members" className="hover:text-white">Members</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/news" className="hover:text-white">News</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Thrico. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
