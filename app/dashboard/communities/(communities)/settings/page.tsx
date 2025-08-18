"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Shield, 
  Users, 
  Bell,
  Globe,
  Lock,
  Trash2,
  Upload,
  Save,
  AlertTriangle
} from "lucide-react"

export default function CommunitySettingsPage() {
  const [communitySettings, setCommunitySettings] = useState({
    name: "Tech Source Club",
    description: "A community for tech lovers to explore, learn, and connect.",
    category: "Technology",
    privacy: "public",
    joinApproval: false,
    postModeration: true,
    allowEvents: true,
    allowPolls: true,
    allowFiles: false,
    notifyAdmins: true,
    weeklyDigest: true,
    memberLimit: 0
  })

  const [moderationRules, setModerationRules] = useState([
    "Be respectful and professional in all interactions",
    "No spam, self-promotion, or off-topic content",
    "Use appropriate language and avoid harassment",
    "Share constructive feedback and help others learn",
    "Respect intellectual property and cite sources"
  ])

  const [bannedWords, setBannedWords] = useState(["spam", "scam", "fake"])

  const handleSettingChange = (key: string, value: any) => {
    setCommunitySettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="flex gap-6 p-4 sm:p-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Community Settings</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Configure your community preferences and rules</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="flex justify-start gap-1 p-1 mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy & Permissions
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Moderation
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Change Avatar
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Community Name</Label>
                  <Input
                    id="name"
                    value={communitySettings.name}
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={communitySettings.description}
                    onChange={(e) => handleSettingChange("description", e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={communitySettings.category} onValueChange={(value) => handleSettingChange("category", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Health">Health & Fitness</SelectItem>
                      <SelectItem value="Arts">Arts & Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="memberLimit">Member Limit (0 = unlimited)</Label>
                  <Input
                    id="memberLimit"
                    type="number"
                    value={communitySettings.memberLimit}
                    onChange={(e) => handleSettingChange("memberLimit", parseInt(e.target.value) || 0)}
                    className="mt-1"
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Community Visibility</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <Globe className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="public"
                            name="privacy"
                            value="public"
                            checked={communitySettings.privacy === "public"}
                            onChange={(e) => handleSettingChange("privacy", e.target.value)}
                          />
                          <Label htmlFor="public" className="font-medium">Public</Label>
                        </div>
                        <p className="text-sm text-gray-600">Anyone can find and join this community</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                        <Lock className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="private"
                            name="privacy"
                            value="private"
                            checked={communitySettings.privacy === "private"}
                            onChange={(e) => handleSettingChange("privacy", e.target.value)}
                          />
                          <Label htmlFor="private" className="font-medium">Private</Label>
                        </div>
                        <p className="text-sm text-gray-600">Only invited members can join</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="joinApproval">Require Join Approval</Label>
                    <p className="text-sm text-gray-600">Admins must approve new member requests</p>
                  </div>
                  <Switch
                    id="joinApproval"
                    checked={communitySettings.joinApproval}
                    onCheckedChange={(checked) => handleSettingChange("joinApproval", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Permissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowEvents">Allow Events</Label>
                    <p className="text-sm text-gray-600">Members can create and share events</p>
                  </div>
                  <Switch
                    id="allowEvents"
                    checked={communitySettings.allowEvents}
                    onCheckedChange={(checked) => handleSettingChange("allowEvents", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowPolls">Allow Polls</Label>
                    <p className="text-sm text-gray-600">Members can create polls and surveys</p>
                  </div>
                  <Switch
                    id="allowPolls"
                    checked={communitySettings.allowPolls}
                    onCheckedChange={(checked) => handleSettingChange("allowPolls", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowFiles">Allow File Uploads</Label>
                    <p className="text-sm text-gray-600">Members can attach files to posts</p>
                  </div>
                  <Switch
                    id="allowFiles"
                    checked={communitySettings.allowFiles}
                    onCheckedChange={(checked) => handleSettingChange("allowFiles", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="postModeration">Post Moderation</Label>
                    <p className="text-sm text-gray-600">Require admin approval for new posts</p>
                  </div>
                  <Switch
                    id="postModeration"
                    checked={communitySettings.postModeration}
                    onCheckedChange={(checked) => handleSettingChange("postModeration", checked)}
                  />
                </div>

                <div>
                  <Label>Community Rules</Label>
                  <div className="mt-2 space-y-2">
                    {moderationRules.map((rule, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <span className="text-sm flex-1">{rule}</span>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      Add New Rule
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Banned Words</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {bannedWords.map((word, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        {word}
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="Add banned word..." className="flex-1" />
                    <Button size="sm">Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifyAdmins">Notify Admins</Label>
                    <p className="text-sm text-gray-600">Send notifications for reported content and requests</p>
                  </div>
                  <Switch
                    id="notifyAdmins"
                    checked={communitySettings.notifyAdmins}
                    onCheckedChange={(checked) => handleSettingChange("notifyAdmins", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                    <p className="text-sm text-gray-600">Send weekly community activity summary</p>
                  </div>
                  <Switch
                    id="weeklyDigest"
                    checked={communitySettings.weeklyDigest}
                    onCheckedChange={(checked) => handleSettingChange("weeklyDigest", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Delete Community</h4>
                    <p className="text-sm text-red-700 mb-3">
                      This action cannot be undone. This will permanently delete the community and all its content.
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete Community
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="w-80 shrink-0 hidden lg:block">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility</span>
                  <Badge variant={communitySettings.privacy === "public" ? "default" : "secondary"}>
                    {communitySettings.privacy}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Join Approval</span>
                  <Badge variant={communitySettings.joinApproval ? "default" : "secondary"}>
                    {communitySettings.joinApproval ? "Required" : "Not Required"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Post Moderation</span>
                  <Badge variant={communitySettings.postModeration ? "default" : "secondary"}>
                    {communitySettings.postModeration ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Limit</span>
                  <span className="font-semibold">
                    {communitySettings.memberLimit === 0 ? "Unlimited" : communitySettings.memberLimit}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Enable post moderation for better content quality.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    🎯 <strong>Goal:</strong> Clear rules help maintain a positive community culture.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    🚀 <strong>Pro:</strong> Regular updates keep your community fresh and engaging.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
