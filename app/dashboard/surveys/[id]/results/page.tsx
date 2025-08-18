"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  BarChart3, 
  Users, 
  Calendar,
  Eye,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

// Mock survey results data
const surveyResults = {
  id: "1",
  title: "Remote Work Preferences 2024",
  description: "Understanding how our community prefers to work remotely",
  status: "active",
  category: "Work",
  createdDate: "Dec 1, 2024",
  endDate: "Dec 31, 2024",
  responses: 234,
  targetResponses: 500,
  questions: [
    {
      id: "q1",
      type: "single-choice",
      title: "What is your preferred work arrangement?",
      responses: 234,
      results: [
        { option: "Fully Remote", count: 98, percentage: 42 },
        { option: "Hybrid (2-3 days remote)", count: 75, percentage: 32 },
        { option: "Hybrid (1-2 days remote)", count: 38, percentage: 16 },
        { option: "Fully On-site", count: 23, percentage: 10 },
      ]
    },
    {
      id: "q2",
      type: "multiple-choice", 
      title: "What are the biggest challenges of remote work? (Select all that apply)",
      responses: 234,
      results: [
        { option: "Communication with team", count: 156, percentage: 67 },
        { option: "Work-life balance", count: 134, percentage: 57 },
        { option: "Distractions at home", count: 98, percentage: 42 },
        { option: "Technology issues", count: 76, percentage: 32 },
        { option: "Feeling isolated", count: 65, percentage: 28 },
        { option: "Time zone differences", count: 45, percentage: 19 },
      ]
    },
    {
      id: "q3",
      type: "rating",
      title: "How satisfied are you with your current remote work setup?",
      responses: 234,
      averageRating: 4.1,
      ratingDistribution: [
        { rating: 5, count: 89, percentage: 38 },
        { rating: 4, count: 78, percentage: 33 },
        { rating: 3, count: 45, percentage: 19 },
        { rating: 2, count: 15, percentage: 6 },
        { rating: 1, count: 7, percentage: 3 },
      ]
    }
  ],
  demographics: {
    responseRate: (234 / 500) * 100,
    completionRate: 89,
    averageTimeSpent: "4.2 minutes",
    topReferralSources: [
      { source: "Email", count: 123, percentage: 53 },
      { source: "Community Feed", count: 67, percentage: 29 },
      { source: "Direct Link", count: 44, percentage: 18 },
    ]
  }
};

export default function SurveyResultsPage({ params }: { params: { id: string } }) {
  const survey = surveyResults; // In real app, fetch by params.id

  const renderQuestionResults = (question: any) => {
    switch (question.type) {
      case "single-choice":
        return (
          <div className="space-y-3">
            {question.results.map((result: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{result.option}</span>
                  <span className="text-sm text-gray-600">
                    {result.count} ({result.percentage}%)
                  </span>
                </div>
                <Progress value={result.percentage} className="h-2" />
              </div>
            ))}
          </div>
        );

      case "multiple-choice":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-3">
              Respondents could select multiple options
            </p>
            {question.results.map((result: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{result.option}</span>
                  <span className="text-sm text-gray-600">
                    {result.count} ({result.percentage}%)
                  </span>
                </div>
                <Progress value={result.percentage} className="h-2" />
              </div>
            ))}
          </div>
        );

      case "rating":
        return (
          <div className="space-y-4">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {question.averageRating}/5
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            
            <div className="space-y-3">
              {question.ratingDistribution.map((rating: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 min-w-[60px]">
                    <span className="text-sm font-medium">{rating.rating}</span>
                    <span className="text-yellow-400">⭐</span>
                  </div>
                  <div className="flex-1">
                    <Progress value={rating.percentage} className="h-2" />
                  </div>
                  <span className="text-sm text-gray-600 min-w-[80px]">
                    {rating.count} ({rating.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <p className="text-gray-500">Results not available for this question type</p>;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/surveys">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Surveys
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
            <p className="text-gray-600">Survey Results & Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Survey Info */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {survey.title}
                <Badge variant={survey.status === "active" ? "default" : "secondary"}>
                  {survey.status}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-2">{survey.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{survey.responses}</div>
              <p className="text-sm text-gray-600">Total Responses</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {survey.demographics.responseRate.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {survey.demographics.completionRate}%
              </div>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {survey.demographics.averageTimeSpent}
              </div>
              <p className="text-sm text-gray-600">Avg. Time Spent</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Target</span>
              <span>{survey.responses}/{survey.targetResponses}</span>
            </div>
            <Progress value={(survey.responses / survey.targetResponses) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="results">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Question Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="responses">Individual Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="mt-6">
          <div className="space-y-6">
            {survey.questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}: {question.title}
                  </CardTitle>
                  <CardDescription>
                    {question.responses} responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderQuestionResults(question)}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Response Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Response Sources
                </CardTitle>
                <CardDescription>Where responses came from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {survey.demographics.topReferralSources.map((source, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{source.source}</span>
                        <span className="text-sm text-gray-600">
                          {source.count} ({source.percentage}%)
                        </span>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Survey Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Survey Timeline
                </CardTitle>
                <CardDescription>Key dates and milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Created</span>
                  <span className="text-sm text-gray-600">{survey.createdDate}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Ends</span>
                  <span className="text-sm text-gray-600">{survey.endDate}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="responses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Responses</CardTitle>
              <CardDescription>
                Detailed view of each survey response (anonymized)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Individual Response Viewer</h3>
                <p className="text-gray-500 mb-4">
                  This feature allows you to view detailed individual responses while maintaining anonymity.
                </p>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Responses
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
