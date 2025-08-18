import { Suspense } from "react"
import GamificationLoading from "./loading"
import { CurrentRankCard } from "@/components/gamification/current-rank-card"
import { TotalPointsCard } from "@/components/gamification/total-points-card"
import { EarnedBadgesCard } from "@/components/gamification/earned-badges-card"
import { RecentAchievements } from "@/components/gamification/recent-achievements"
import { EarnedBadgesSection } from "@/components/gamification/earned-badges-section"
import { PointsSourceTable } from "@/components/gamification/points-source-table"
import { Leaderboard } from "@/components/gamification/leaderboard"
import { Card } from "@/components/ui/card"

export default function GamificationPage() {
  // Mock data for demonstration
  const userRank = "Gold Tier"
  const userTotalPoints = 1500
  const userBadgesEarned = 7
  const totalAvailableBadges = 10 // Example total
  const pointsToday = 75
  const pointsThisWeek = 250

  // Mock data for next milestone (still passed to CurrentRankCard for display)
  const nextRank = "Platinum Tier"
  const pointsToNextRank = 500

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Gamification Dashboard</h1>

      <Suspense fallback={<GamificationLoading />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Leaderboard/> 
              <RecentAchievements />
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
  
       
          <CurrentRankCard
            rank={userRank}
            totalPoints={userTotalPoints}
            nextRank={nextRank}
            pointsToNextRank={pointsToNextRank}
          />
          <TotalPointsCard totalPoints={userTotalPoints} pointsToday={pointsToday} pointsThisWeek={pointsThisWeek} />
          <EarnedBadgesCard badgesEarned={userBadgesEarned} totalBadges={totalAvailableBadges} />
        </div>
        {/* Moved up to be more prominent */}
        <EarnedBadgesSection />
        <PointsSourceTable />
      </Suspense>
    </div>
  )
}
