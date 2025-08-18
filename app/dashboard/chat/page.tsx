"use client"

import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { useState } from "react"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)

  return (
    <div className="flex h-[calc(100vh-120px)] bg-background rounded-lg border overflow-hidden relative">
      {/* Chat Sidebar */}
      <div className={`
        ${selectedChat && isMobileChatOpen ? 'hidden lg:flex' : 'flex'} 
        w-full lg:w-72ß flex-shrink-0 border-r
      `}>
        <ChatSidebar
          selectedChat={selectedChat}
          onSelectChat={(chatId) => {
            setSelectedChat(chatId)
            setIsMobileChatOpen(true)
          }}
        />
      </div>

      {/* Chat Interface */}
      <div className={`
        ${!selectedChat || (!isMobileChatOpen && selectedChat) ? 'hidden lg:flex' : 'flex'} 
        flex-1 flex-col
        ${selectedChat && isMobileChatOpen ? 'absolute inset-0 lg:relative lg:inset-auto' : ''}
      `}>
        {selectedChat ? (
          <>
            <ChatHeader
              chatId={selectedChat}
              onBack={() => {
                setIsMobileChatOpen(false)
                setSelectedChat(null)
              }}
            />
            <ChatInterface chatId={selectedChat} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
