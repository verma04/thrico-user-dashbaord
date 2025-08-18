'use client'

import React, { useState } from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { HelpdeskSidebar } from './helpdesk-sidebar'
import { ChatInterface } from './chat-interface'
import { IssueMetadata } from './issue-metadata'
import { mockIssues, type GitHubIssue } from './mock-data'

export function HelpdeskDashboard() {
  const [selectedIssue, setSelectedIssue] = useState<GitHubIssue | null>(mockIssues[0])
  const [showMetadata, setShowMetadata] = useState(true)

  return (
    <div className="h-screen bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <HelpdeskSidebar 
            selectedIssue={selectedIssue}
            onSelectIssue={setSelectedIssue}
          />
        </ResizablePanel>
        
        <ResizableHandle />
        
        {/* Main Chat Area */}
        <ResizablePanel defaultSize={showMetadata ? 55 : 80}>
          <ChatInterface 
            issue={selectedIssue}
            onToggleMetadata={() => setShowMetadata(!showMetadata)}
            showMetadata={showMetadata}
          />
        </ResizablePanel>
        
        {/* Right Metadata Panel */}
        {showMetadata && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <IssueMetadata issue={selectedIssue} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  )
}
