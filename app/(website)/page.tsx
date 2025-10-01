import HeroBanner from "@/components/home-page/hero-banner";
import UpcomingEvents from "@/components/upcoming-events";

import LatestMembers from "@/components/latest-members";
import Testimonials from "@/components/testimonials-users";
import JobOpportunities from "@/components/job-opportunities";
import Footer from "@/components/Footer";

import WebsiteLayout from "@/components/layout/website-layout";
import getData from "../server/get-details";
import UserAroundWorld from "@/components/home-page/user-around-world";

export default async function HomePage() {
  const data = await getData();

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />
      <UpcomingEvents />
      <LatestMembers />
      <Testimonials />
      <JobOpportunities />
      <UserAroundWorld />
    </div>
  );
}
