import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Headphones } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
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
              <Link href="/about" className="text-gray-600 hover:text-gray-900 nav-text-small">
                About
              </Link>
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 nav-text-small font-medium">
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
              Get in <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="body-text text-blue-100 mb-8 text-lg">
              Have questions about Thrico? Want to partner with us? We'd love to hear from you.
              Our team is here to help you make the most of your community experience.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "General Inquiries",
                description: "Questions about our platform, features, or how to get started.",
                contact: "hello@thrico.com",
                action: "Send Email"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Partnership",
                description: "Interested in partnering with us or hosting events on our platform.",
                contact: "partnerships@thrico.com",
                action: "Get in Touch"
              },
              {
                icon: <Headphones className="w-8 h-8" />,
                title: "Support",
                description: "Need help with your account or technical assistance.",
                contact: "support@thrico.com",
                action: "Get Help"
              }
            ].map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600">
                    {method.icon}
                  </div>
                  <CardTitle className="heading-h4">{method.title}</CardTitle>
                  <CardDescription className="body-text-small">{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-blue-600 mb-4">{method.contact}</p>
                  <Button variant="outline" className="w-full button-text-small">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="heading-h2 text-gray-900 mb-6">Send us a Message</h2>
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="label-text">First Name</Label>
                        <Input id="firstName" placeholder="John" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="label-text">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="label-text">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="company" className="label-text">Company (Optional)</Label>
                      <Input id="company" placeholder="Your Company" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="label-text">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="label-text">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..." 
                        className="mt-1 min-h-[120px]" 
                      />
                    </div>
                    <Button type="submit" className="w-full button-text">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="heading-h2 text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Office Address</h3>
                        <p className="body-text-small text-gray-600">
                          123 Innovation Drive<br />
                          San Francisco, CA 94107<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                        <p className="body-text-small text-gray-600">
                          +1 (555) 123-4567<br />
                          <span className="text-gray-500">Monday - Friday, 9AM - 6PM PST</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                        <p className="body-text-small text-gray-600">
                          General: hello@thrico.com<br />
                          Support: support@thrico.com<br />
                          Press: press@thrico.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                        <p className="body-text-small text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                          Saturday: 10:00 AM - 4:00 PM PST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about Thrico
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How do I join the Thrico community?",
                answer: "Simply click 'Get Started' and create your free account. You can start connecting with professionals and joining events immediately."
              },
              {
                question: "Is Thrico free to use?",
                answer: "Yes! Thrico offers a free tier with access to basic features. We also offer premium plans with additional benefits for power users."
              },
              {
                question: "How do I host an event on Thrico?",
                answer: "Once you're a member, you can create events through your dashboard. Our team reviews all events to ensure quality and relevance to our community."
              },
              {
                question: "Can I delete my account anytime?",
                answer: "Absolutely. You have full control over your account and can delete it anytime through your profile settings or by contacting our support team."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="heading-h4">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text-small text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
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
