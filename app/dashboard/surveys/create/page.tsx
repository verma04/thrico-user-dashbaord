"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Calendar as CalendarIcon, 
  Eye, 
  Save, 
  ArrowLeft,
  Settings,
  Users,
  BarChart3,
  Copy,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useSurveyStore, SurveyQuestion } from "@/lib/survey-store";
import { useRouter } from "next/navigation";

const questionTypes = [
  { value: "multiple-choice", label: "Multiple Choice", icon: "☑️", description: "Select multiple options" },
  { value: "single-choice", label: "Single Choice", icon: "⚪", description: "Select one option" },
  { value: "text", label: "Short Text", icon: "✏️", description: "Single line input" },
  { value: "textarea", label: "Long Text", icon: "📝", description: "Multi-line input" },
  { value: "rating", label: "Rating Scale", icon: "⭐", description: "1-5 star rating" },
  { value: "boolean", label: "Yes/No", icon: "✅", description: "Binary choice" },
  { value: "date", label: "Date", icon: "📅", description: "Date picker" },
  { value: "number", label: "Number", icon: "🔢", description: "Numeric input" },
];

const surveyCategories = [
  "General", "Work", "Events", "Technology", "Community", "Career", "Education", "Feedback"
];

export default function CreateSurveyPage() {
  const router = useRouter();
  const {
    currentSurvey,
    createSurvey,
    updateSurvey,
    saveSurvey,
    publishSurvey,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    addOption,
    updateOption,
    deleteOption,
    updateSettings,
  } = useSurveyStore();

  // Initialize a new survey when component mounts
  useEffect(() => {
    createSurvey();
  }, [createSurvey]);

  const handleSaveDraft = () => {
    saveSurvey();
    // You could show a toast notification here
  };

  const handlePublish = () => {
    if (!currentSurvey.title?.trim()) {
      alert("Please add a survey title before publishing");
      return;
    }
    if (!currentSurvey.questions?.length) {
      alert("Please add at least one question before publishing");
      return;
    }
    
    publishSurvey();
    router.push("/dashboard/surveys");
  };

  const renderQuestionEditor = (question: SurveyQuestion, index: number) => (
    <Card key={question.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          <Badge variant="outline" className="text-xs">
            {questionTypes.find(t => t.value === question.type)?.icon} {questionTypes.find(t => t.value === question.type)?.label}
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <Switch
              checked={question.required}
              onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
            />
            <Label className="text-sm">Required</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => duplicateQuestion(question.id)}
              className="text-blue-500 hover:text-blue-700"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteQuestion(question.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor={`question-title-${question.id}`}>Question {index + 1}</Label>
            <Input
              id={`question-title-${question.id}`}
              placeholder="Enter your question..."
              value={question.title}
              onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`question-desc-${question.id}`}>Description (Optional)</Label>
            <Textarea
              id={`question-desc-${question.id}`}
              placeholder="Add additional context or instructions..."
              value={question.description || ""}
              onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
              className="mt-1 h-20"
            />
          </div>

          {(question.type === "multiple-choice" || question.type === "single-choice") && (
            <div>
              <Label>Options</Label>
              <div className="space-y-2 mt-2">
                {question.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm min-w-[20px]">
                      {question.type === "multiple-choice" ? "☑️" : "⚪"}
                    </span>
                    <Input
                      value={option}
                      onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    {question.options && question.options.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteOption(question.id, optionIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addOption(question.id)}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {question.type === "rating" && (
            <div>
              <Label>Rating Scale</Label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">1</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">⭐</span>
                ))}
                <span className="text-sm text-gray-600">5</span>
              </div>
            </div>
          )}

          {question.type === "number" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum Value (Optional)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={question.validation?.min || ""}
                  onChange={(e) => updateQuestion(question.id, {
                    validation: { ...question.validation, min: parseInt(e.target.value) || undefined }
                  })}
                />
              </div>
              <div>
                <Label>Maximum Value (Optional)</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={question.validation?.max || ""}
                  onChange={(e) => updateQuestion(question.id, {
                    validation: { ...question.validation, max: parseInt(e.target.value) || undefined }
                  })}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderPreview = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{currentSurvey.title || "Untitled Survey"}</CardTitle>
          {currentSurvey.description && (
            <CardDescription className="text-base">{currentSurvey.description}</CardDescription>
          )}
          {currentSurvey.settings?.category && (
            <Badge variant="outline" className="w-fit">{currentSurvey.settings.category}</Badge>
          )}
        </CardHeader>
      </Card>

      {currentSurvey.questions?.map((question, index) => (
        <Card key={question.id} className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <span>Question {index + 1}</span>
                  {question.required && <span className="text-red-500">*</span>}
                </h3>
                <p className="text-lg mt-1">{question.title || "Question title..."}</p>
                {question.description && (
                  <p className="text-sm text-gray-600 mt-1">{question.description}</p>
                )}
              </div>

              {question.type === "multiple-choice" && (
                <div className="space-y-2">
                  {question.options?.map((option, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === "single-choice" && (
                <div className="space-y-2">
                  {question.options?.map((option, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={question.id} className="rounded-full" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === "text" && (
                <Input placeholder="Your answer..." className="mt-2" />
              )}

              {question.type === "textarea" && (
                <Textarea placeholder="Your answer..." className="mt-2" />
              )}

              {question.type === "rating" && (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-2xl hover:text-yellow-400">⭐</button>
                  ))}
                </div>
              )}

              {question.type === "boolean" && (
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={question.id} />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={question.id} />
                    <span>No</span>
                  </label>
                </div>
              )}

              {question.type === "date" && (
                <Input type="date" className="w-fit" />
              )}

              {question.type === "number" && (
                <Input 
                  type="number" 
                  placeholder="Enter a number..." 
                  min={question.validation?.min}
                  max={question.validation?.max}
                  className="w-fit" 
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {(!currentSurvey.questions || currentSurvey.questions.length === 0) && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No questions added yet. Switch to the Edit tab to add questions.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Create Survey</h1>
            <p className="text-gray-600">Design and configure your survey</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Publish Survey
          </Button>
        </div>
      </div>

      <Tabs defaultValue="edit">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Questions</CardTitle>
                  <CardDescription>Choose a question type to add</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {questionTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant="outline"
                        className="w-full justify-start text-left p-3 h-auto"
                        onClick={() => addQuestion(type.value as SurveyQuestion["type"])}
                      >
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-center gap-2">
                            <span>{type.icon}</span>
                            <span className="font-medium">{type.label}</span>
                          </div>
                          <span className="text-xs text-gray-500">{type.description}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Editor */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Survey Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Survey Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="survey-title">Survey Title</Label>
                      <Input
                        id="survey-title"
                        placeholder="Enter survey title..."
                        value={currentSurvey.title || ""}
                        onChange={(e) => updateSurvey({ title: e.target.value })}
                        className="text-lg font-medium"
                      />
                    </div>
                    <div>
                      <Label htmlFor="survey-description">Description</Label>
                      <Textarea
                        id="survey-description"
                        placeholder="Describe what this survey is about..."
                        value={currentSurvey.description || ""}
                        onChange={(e) => updateSurvey({ description: e.target.value })}
                        className="h-24"
                      />
                    </div>
                    <div>
                      <Label htmlFor="survey-category">Category</Label>
                      <Select 
                        value={currentSurvey.settings?.category || ""} 
                        onValueChange={(value) => updateSettings({ category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {surveyCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Questions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                      Questions ({currentSurvey.questions?.length || 0})
                    </h2>
                  </div>
                  
                  {(!currentSurvey.questions || currentSurvey.questions.length === 0) ? (
                    <Card>
                      <CardContent className="text-center py-12">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
                        <p className="text-gray-500 mb-4">Start building your survey by adding questions from the sidebar.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      {currentSurvey.questions.map((question, index) => 
                        renderQuestionEditor(question, index)
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          {renderPreview()}
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Survey Settings
                </CardTitle>
                <CardDescription>Configure how your survey behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Public Survey</Label>
                    <p className="text-sm text-gray-600">Allow anyone in the community to take this survey</p>
                  </div>
                  <Switch
                    checked={currentSurvey.settings?.isPublic || false}
                    onCheckedChange={(checked) => updateSettings({ isPublic: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Anonymous Responses</Label>
                    <p className="text-sm text-gray-600">Don't collect respondent information</p>
                  </div>
                  <Switch
                    checked={currentSurvey.settings?.allowAnonymous || false}
                    onCheckedChange={(checked) => updateSettings({ allowAnonymous: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Multiple Responses</Label>
                    <p className="text-sm text-gray-600">Allow users to submit multiple responses</p>
                  </div>
                  <Switch
                    checked={currentSurvey.settings?.multipleResponses || false}
                    onCheckedChange={(checked) => updateSettings({ multipleResponses: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Show Results</Label>
                    <p className="text-sm text-gray-600">Display results to respondents after submission</p>
                  </div>
                  <Switch
                    checked={currentSurvey.settings?.showResults !== false}
                    onCheckedChange={(checked) => updateSettings({ showResults: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="target-responses">Target Responses</Label>
                  <Input
                    id="target-responses"
                    type="number"
                    value={currentSurvey.settings?.targetResponses || 100}
                    onChange={(e) => updateSettings({ targetResponses: parseInt(e.target.value) || 100 })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>End Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !currentSurvey.settings?.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentSurvey.settings?.endDate 
                          ? format(currentSurvey.settings.endDate, "PPP") 
                          : "Select end date"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={currentSurvey.settings?.endDate}
                        onSelect={(date) => updateSettings({ endDate: date })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="reward">Reward (Optional)</Label>
                  <Input
                    id="reward"
                    placeholder="e.g., Chance to win $100 gift card"
                    value={currentSurvey.settings?.reward || ""}
                    onChange={(e) => updateSettings({ reward: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
