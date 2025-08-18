import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GamificationLoading() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Skeleton className="h-10 w-64" /> {/* Title Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-[120px] w-full" /> {/* Current Rank Card Skeleton */}
        <Skeleton className="h-[120px] w-full" /> {/* Total Points Card Skeleton */}
        <Skeleton className="h-[120px] w-full" /> {/* Earned Badges Card Skeleton */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-sm">
              <Skeleton className="h-16 w-16 rounded-full mb-2" />
              <Skeleton className="h-6 w-24 mb-1" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-3 w-20 mt-1" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Skeleton className="h-[200px] w-full" /> {/* Recent Achievements Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-md">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Skeleton className="h-[300px] w-full" /> {/* Earned Badges Section Skeleton */}
      <Skeleton className="h-[350px] w-full" /> {/* Points Source Table Skeleton */}
    </div>
  )
}
