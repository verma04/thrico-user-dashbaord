import { NetworkLayout } from "@/components/network";


export default function NetworkPage() {
  return (
    <div className="p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Network</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Connect with friends and expand your network</p>
        </div>
      </div>
      
      <NetworkLayout />
    </div>
  );
}
