"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Clock, Users, BarChart3, Eye, Edit, Share2, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function SurveysPage() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Surveys</h1>
          <p className="text-gray-600">Create and manage community surveys and polls</p>
        </div>
        <Link href="/dashboard/surveys/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Survey
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search surveys..." className="pl-10" />
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Active
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Draft
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Completed
          </Badge>
        </div>
      </div>

      {/* My Surveys */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">My Surveys</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Remote Work Preferences 2024",
              description: "Understanding how our community prefers to work remotely",
              status: "active",
              responses: 234,
              targetResponses: 500,
              createdDate: "Dec 1, 2024",
              endDate: "Dec 31, 2024",
              questions: 12,
              category: "Work",
            },
            {
              title: "Community Event Feedback",
              description: "Feedback on our recent networking event",
              status: "completed",
              responses: 89,
              targetResponses: 100,
              createdDate: "Nov 15, 2024",
              endDate: "Nov 30, 2024",
              questions: 8,
              category: "Events",
            },
            {
              title: "Tech Stack Survey",
              description: "What technologies are you using in 2024?",
              status: "draft",
              responses: 0,
              targetResponses: 300,
              createdDate: "Dec 5, 2024",
              endDate: "Jan 15, 2025",
              questions: 15,
              category: "Technology",
            },
          ].map((survey, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{survey.title}</CardTitle>
                      <Badge
                        variant={
                          survey.status === "active"
                            ? "default"
                            : survey.status === "completed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {survey.status}
                      </Badge>
                    </div>
                    <CardDescription>{survey.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Responses</span>
                      <span>
                        {survey.responses}/{survey.targetResponses}
                      </span>
                    </div>
                    <Progress value={(survey.responses / survey.targetResponses) * 100} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-gray-500" />
                      <span>{survey.questions} questions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Ends {survey.endDate}</span>
                    </div>
                  </div>

                  <Badge variant="outline">{survey.category}</Badge>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Link href={`/dashboard/surveys/${index + 1}/results`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Surveys */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Community Surveys</h2>
        <div className="space-y-4">
          {[
            {
              title: "Annual Community Health Survey",
              author: "Community Team",
              authorAvatar: "/placeholder.svg?height=32&width=32",
              description: "Help us understand how to better serve our community",
              responses: 1234,
              targetResponses: 2000,
              timeLeft: "5 days left",
              reward: "Chance to win $100 gift card",
              questions: 20,
              estimatedTime: "5 minutes",
              category: "Community",
            },
            {
              title: "Salary Transparency Survey",
              author: "Marcus Johnson",
              authorAvatar: "/placeholder.svg?height=32&width=32",
              description: "Anonymous survey to understand salary ranges in our industry",
              responses: 567,
              targetResponses: 1000,
              timeLeft: "12 days left",
              reward: "Free salary report",
              questions: 15,
              estimatedTime: "3 minutes",
              category: "Career",
            },
            {
              title: "Learning & Development Needs",
              author: "Elena Rodriguez",
              authorAvatar: "/placeholder.svg?height=32&width=32",
              description: "What skills do you want to develop in 2024?",
              responses: 345,
              targetResponses: 500,
              timeLeft: "8 days left",
              reward: "Early access to courses",
              questions: 10,
              estimatedTime: "2 minutes",
              category: "Education",
            },
          ].map((survey, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={survey.authorAvatar || "/placeholder.svg"} alt={survey.author} />
                    <AvatarFallback>
                      {survey.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{survey.title}</h3>
                        <p className="text-sm text-gray-600">by {survey.author}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{survey.category}</Badge>
                        <p className="text-sm text-gray-500 mt-1">{survey.timeLeft}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{survey.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>
                          {survey.responses}/{survey.targetResponses} responses
                        </span>
                      </div>
                      <Progress value={(survey.responses / survey.targetResponses) * 100} className="h-2" />
                    </div>

                    {/* Survey Info */}
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        {survey.questions} questions
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />~{survey.estimatedTime}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {survey.responses} responses
                      </span>
                    </div>

                    {/* Reward */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-green-800">Reward: {survey.reward}</span>
                      </div>
                    </div>

                    <Button className="w-full sm:w-auto">
                      <Link href={`/dashboard/surveys/${index + 1}`} className="flex items-center">
                        Take Survey
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Polls */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Polls</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              question: "What's your preferred meeting time for community events?",
              author: "David Kim",
              options: [
                { text: "Weekday evenings", votes: 45, percentage: 35 },
                { text: "Weekend mornings", votes: 38, percentage: 30 },
                { text: "Weekend afternoons", votes: 28, percentage: 22 },
                { text: "Weekday lunch time", votes: 17, percentage: 13 },
              ],
              totalVotes: 128,
              timeLeft: "2 days left",
              hasVoted: false,
            },
            {
              question: "Which technology topic interests you most?",
              author: "Jennifer Walsh",
              options: [
                { text: "Artificial Intelligence", votes: 67, percentage: 42 },
                { text: "Web3 & Blockchain", votes: 34, percentage: 21 },
                { text: "Cloud Computing", votes: 31, percentage: 19 },
                { text: "Mobile Development", votes: 28, percentage: 18 },
              ],
              totalVotes: 160,
              timeLeft: "5 days left",
              hasVoted: true,
            },
          ].map((poll, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{poll.question}</CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>by {poll.author}</span>
                  <span>{poll.timeLeft}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {poll.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{option.text}</span>
                        <span className="text-sm text-gray-500">{option.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${option.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-gray-600">{poll.totalVotes} votes</span>
                    {poll.hasVoted ? (
                      <Badge variant="secondary">Voted</Badge>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => {
                          // Handle vote logic here
                          console.log('Voting on poll:', poll.question);
                        }}
                      >
                        Vote
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
