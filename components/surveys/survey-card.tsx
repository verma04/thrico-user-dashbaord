import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Share2, 
  Copy, 
  Pause, 
  Play, 
  Trash2,
  BarChart3,
  Calendar
} from "lucide-react";
import Link from "next/link";

interface Survey {
  id: string;
  title: string;
  description: string;
  status: "active" | "draft" | "completed" | "paused";
  responses: number;
  targetResponses: number;
  createdDate: string;
  endDate: string;
  questions: number;
  category: string;
}

interface SurveyCardProps {
  survey: Survey;
  index: number;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export function SurveyCard({ 
  survey, 
  index, 
  onDuplicate, 
  onDelete, 
  onToggleStatus 
}: SurveyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "completed":
        return "secondary";
      case "paused":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "duplicate":
        onDuplicate?.(survey.id);
        break;
      case "delete":
        if (confirm("Are you sure you want to delete this survey?")) {
          onDelete?.(survey.id);
        }
        break;
      case "toggle":
        onToggleStatus?.(survey.id);
        break;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className="text-lg">{survey.title}</CardTitle>
              <Badge variant={getStatusColor(survey.status) as any}>
                {survey.status}
              </Badge>
            </div>
            <CardDescription>{survey.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/surveys/${survey.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Survey
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("duplicate")}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleAction("toggle")}>
                {survey.status === "active" ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Survey
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Activate Survey
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleAction("delete")}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Survey
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <Link href={`/dashboard/surveys/${survey.id}/results`} className="flex-1">
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
  );
}
