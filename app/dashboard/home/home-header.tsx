export default function HomeHeader({ getUser, drawerStore }: any) {
  return (
    <>
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-2xl font-bold mb-2">
              Welcome back, {getUser?.firstName} {getUser?.lastName}! 👋
            </h1>
            <p className="text-blue-100 text-xs sm:text-base mb-3">
              Here's your complete community activity overview
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-blue-100 text-xs sm:text-sm">
              <span>🌟 You have 3 new notifications</span>
              <span>📅 2 events today</span>
              <span>💬 5 new comments</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
