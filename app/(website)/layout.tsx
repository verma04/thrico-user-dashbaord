import type React from "react";

import { ApolloWrapper } from "@/utils/apollo-provider";
import getData from "../server/get-details";
import WebsiteLayout from "@/components/layout/website-layout";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const data = await getData();
  return (
    <ApolloWrapper>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 pb-20 md:pb-4">
        <WebsiteLayout data={data}>{children}</WebsiteLayout>
      </div>
    </ApolloWrapper>
  );
}

export default DashboardLayout;
