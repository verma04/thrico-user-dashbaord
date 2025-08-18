import { FeedHeader } from "@/components/feed/feed-header";
import { FeedLayout } from "@/components/feed/feed-layout";
import { FeedSidebar } from "@/components/feed/feed-sidebar";
import { FeedLeftSidebar } from "@/components/feed/feed-left-sidebar";

export default function FeedPage() {
  return (
    <div className="p-4 md:p-6 max-w-full">
      <FeedHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Left Sidebar - User Profile */}
        <div className="lg:col-span-3 hidden lg:block">
          <FeedLeftSidebar />
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-6 space-y-4">
          <FeedLayout /> 
        </div>
        
        {/* Right Sidebar - Feed Features */}
        <div className="lg:col-span-3 hidden lg:block">
          <FeedSidebar />
        </div>
        
        {/* Mobile Right Sidebar */}
        <div className="lg:hidden">
          <FeedSidebar />
        </div>
      </div>
    </div>
  )
}
