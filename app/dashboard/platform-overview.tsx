import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PlatformOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Platform Overview</CardTitle>
        <CardDescription>Your activity summary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 border rounded">
              <div className="text-lg font-bold text-blue-600">89%</div>
              <div className="text-xs text-gray-600">Profile Complete</div>
            </div>
            <div className="text-center p-2 border rounded">
              <div className="text-lg font-bold text-green-600">24</div>
              <div className="text-xs text-gray-600">This Week Posts</div>
            </div>
            <div className="text-center p-2 border rounded">
              <div className="text-lg font-bold text-purple-600">156</div>
              <div className="text-xs text-gray-600">Total Connections</div>
            </div>
            <div className="text-center p-2 border rounded">
              <div className="text-lg font-bold text-orange-600">7</div>
              <div className="text-xs text-gray-600">Active Communities</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Weekly Activity</span>
              <span>78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>✅ Active in communities</span>
            </div>
            <div className="flex items-center justify-between">
              <span>✅ Engaged in discussions</span>
            </div>
            <div className="flex items-center justify-between">
              <span>❌ Complete profile portfolio</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}