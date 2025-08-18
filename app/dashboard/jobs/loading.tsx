// This loading.tsx will apply to the entire /dashboard/jobs route segment
export default function Loading() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-md h-10 bg-gray-200 rounded animate-pulse" />
        <div className="flex flex-wrap gap-2 sm:space-x-2">
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 sm:p-6 bg-gray-100 rounded-lg animate-pulse h-40" />
          ))}
        </div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 bg-gray-100 rounded-lg animate-pulse h-48" />
          ))}
        </div>
      </div>
    </div>
  )
}
