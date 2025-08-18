"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Users,
  BarChart3
} from "lucide-react";
import Link from "next/link";

// Mock survey data - this would come from your API/database
const mockSurvey = {
  id: "1",
  title: "Annual Community Health Survey",
  description: "Help us understand how to better serve our community",
  category: "Community",
  author: "Community Team",
  responses: 1234,
  targetResponses: 2000,
  timeLeft: "5 days left",
  estimatedTime: "5 minutes",
  reward: "Chance to win $100 gift card",
  questions: [
    {
      id: "q1",
      type: "single-choice",
      title: "How would you rate your overall satisfaction with our community?",
      description: "Please consider all aspects of your experience",
      required: true,
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    },
    {
      id: "q2", 
      type: "multiple-choice",
      title: "Which community features do you use most? (Select all that apply)",
      required: true,
      options: ["Discussion Forums", "Job Board", "Events", "Networking", "Marketplace", "News Feed"]
    },
    {
      id: "q3",
      type: "rating",
      title: "How likely are you to recommend our community to a friend?",
      description: "1 = Not likely at all, 5 = Extremely likely",
      required: true
    },
    {
      id: "q4",
      type: "textarea",
      title: "What improvements would you like to see in our community?",
      description: "Your feedback helps us prioritize new features and improvements",
      required: false
    },
    {
      id: "q5",
      type: "boolean",
      title: "Would you be interested in becoming a community moderator?",
      required: false
    }
  ]
};

export default function TakeSurveyPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const survey = mockSurvey; // In real app, fetch by params.id
  const progress = ((currentQuestion + 1) / survey.questions.length) * 100;
  const question = survey.questions[currentQuestion];

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < survey.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would submit the responses to your API
    console.log('Survey responses:', responses);
    setIsSubmitted(true);
  };

  const isCurrentQuestionAnswered = () => {
    if (!question.required) return true;
    const response = responses[question.id];
    
    if (question.type === "multiple-choice") {
      return response && response.length > 0;
    }
    
    return response !== undefined && response !== null && response !== "";
  };

  const renderQuestion = () => {
    const response = responses[question.id];

    switch (question.type) {
      case "single-choice":
        return (
          <RadioGroup 
            value={response || ""} 
            onValueChange={(value) => handleResponse(question.id, value)}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${index}`}
                  checked={response?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const currentResponses = response || [];
                    if (checked) {
                      handleResponse(question.id, [...currentResponses, option]);
                    } else {
                      handleResponse(question.id, currentResponses.filter((r: string) => r !== option));
                    }
                  }}
                />
                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case "textarea":
        return (
          <Textarea
            placeholder="Enter your response..."
            value={response || ""}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            className="min-h-[120px]"
          />
        );

      case "text":
        return (
          <Input
            placeholder="Enter your response..."
            value={response || ""}
            onChange={(e) => handleResponse(question.id, e.target.value)}
          />
        );

      case "rating":
        return (
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleResponse(question.id, star)}
                className={`text-3xl transition-colors ${
                  star <= (response || 0) ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
                }`}
              >
                ⭐
              </button>
            ))}
            {response && (
              <span className="ml-2 text-sm text-gray-600">
                {response} out of 5
              </span>
            )}
          </div>
        );

      case "boolean":
        return (
          <RadioGroup 
            value={response?.toString() || ""} 
            onValueChange={(value) => handleResponse(question.id, value === "true")}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`${question.id}-yes`} />
              <Label htmlFor={`${question.id}-yes`} className="cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`${question.id}-no`} />
              <Label htmlFor={`${question.id}-no`} className="cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        );

      case "date":
        return (
          <Input
            type="date"
            value={response || ""}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            className="w-fit"
          />
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank you for your response!</h1>
            <p className="text-gray-600 mb-6">
              Your feedback is valuable and helps us improve our community.
            </p>
            
            {survey.reward && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">
                    You're now eligible for: {survey.reward}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Link href="/dashboard/surveys">
                <Button variant="outline">
                  View More Surveys
                </Button>
              </Link>
              <Link href="/dashboard/surveys">
                <Button>
                  Back to Surveys
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard/surveys">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Surveys
          </Button>
        </Link>
        
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{survey.title}</h1>
          <p className="text-gray-600 mb-4">{survey.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Badge variant="outline">{survey.category}</Badge>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              ~{survey.estimatedTime}
            </span>
            <span className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              {survey.questions.length} questions
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {survey.responses} responses
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>Question {currentQuestion + 1} of {survey.questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {survey.reward && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800">Complete this survey to earn: {survey.reward}</span>
            </div>
          </div>
        )}
      </div>

      {/* Question */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                Question {currentQuestion + 1}
                {question.required && <span className="text-red-500 text-sm">*</span>}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {question.title}
              </CardDescription>
              {question.description && (
                <p className="text-sm text-gray-600 mt-2">{question.description}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {renderQuestion()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentQuestion === survey.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={question.required && !isCurrentQuestionAnswered()}
          >
            Submit Survey
            <CheckCircle className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={question.required && !isCurrentQuestionAnswered()}
          >
            Next Question
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Required field notice */}
      {question.required && !isCurrentQuestionAnswered() && (
        <p className="text-sm text-red-500 text-center mt-4">
          * This question is required
        </p>
      )}
    </div>
  );
}
