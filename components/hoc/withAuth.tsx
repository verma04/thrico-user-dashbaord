"use client";

import { usePathname } from "next/navigation";
import { useGetUser } from "../grapqhl/action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // shadcn/ui
import Kyc from "../kyc/Kyc";
import { Redirect } from "../redirect";

// import { cn } from "@/lib/utils"; // If you use className helpers

export default (WrappedComponent: any, options = { ssr: false }) => {
  function WithAuth(props: any) {
    const pathname = usePathname();
    const { data: { getUser } = {}, loading, error } = useGetUser();

    if (loading) {
      return <></>;
    }
    if (!loading && (!getUser || error) && typeof window !== "undefined") {
      localStorage.removeItem("key");
      return <> <Redirect to="/" /> </>;
    }

  

    // if (!getUser?.isRequested) {
    //   return <Kyc />;
    // }
    if (getUser?.isRequested && !getUser?.isApproved) {
      return (
        <>
          <div className="mb-2.5">
            <Alert>
              <AlertTitle>Profile Under Review</AlertTitle>
              <AlertDescription>
                Your profile is currently under review. You will gain access to
                all features once it is approved by the admin.
              </AlertDescription>
            </Alert>
          </div>
        </>
      );
    }

    
      return (
        <>
          <WrappedComponent {...props} />
        </>
      );
    
  }

  return WithAuth;
};
