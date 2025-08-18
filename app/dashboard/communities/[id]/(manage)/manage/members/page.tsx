"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Shield, UserX, Send } from "lucide-react"
import { useMembers } from "@/hooks/use-community-management"

export default function MembersPage() {
  const { members, handlePromoteMember, handleRemoveMember } = useMembers()
  const [inviteEmail, setInviteEmail] = useState("")

  const handleInviteMember = () => {
    if (inviteEmail.trim()) {
      // In a real app, you'd send an invitation
      console.log("Inviting:", inviteEmail)
      setInviteEmail("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Invite Members */}
      <Card>
        <CardHeader>
          <CardTitle>Invite Members</CardTitle>
          <CardDescription>Invite people to join your community.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleInviteMember} disabled={!inviteEmail.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Send Invite
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Members Management */}
      <Card>
        <CardHeader>
          <CardTitle>Members Management ({members.length})</CardTitle>
          <CardDescription>Manage your community members and their roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{member.name}</h4>
                      <Badge
                        variant={
                          member.role === "Admin"
                            ? "default"
                            : member.role === "Co-Admin"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {member.role === "Admin" && <Crown className="w-3 h-3 mr-1" />}
                        {member.role === "Co-Admin" && <Shield className="w-3 h-3 mr-1" />}
                        {member.role}
                      </Badge>
                      {!member.isActive && (
                        <Badge variant="destructive" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Joined {member.joinDate} • {member.posts} posts
                    </p>
                  </div>
                </div>

                {member.role !== "Admin" && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handlePromoteMember(member.id)}>
                      {member.role === "Co-Admin" ? "Remove Co-Admin" : "Make Co-Admin"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveMember(member.id)}>
                      <UserX className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
