"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserCheck, CheckCircle, XCircle } from "lucide-react"
import { useJoinRequests } from "@/hooks/use-community-management"

export default function RequestsPage() {
  const { joinRequests, handleApproveRequest, handleRejectRequest } = useJoinRequests()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Join Requests ({joinRequests.length})</CardTitle>
          <CardDescription>Review and approve new member requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {joinRequests.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending join requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {joinRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={request.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{request.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{request.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">Requested {request.requestDate}</p>
                        {request.message && (
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">"{request.message}"</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleRejectRequest(request.id)}>
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
