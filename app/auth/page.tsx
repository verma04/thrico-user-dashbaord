"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTokenStore } from "@/lib/token-store";

const Page = () => {
  const searchParams = useSearchParams();
  const path = searchParams?.get("path");
  const token = searchParams?.get("token");

  const storeToken = useTokenStore((state) => state.storeToken);
  const router = useRouter();

  useEffect(() => {
    if (token && path) {
      storeToken(token.replaceAll(" ", "+"));
      try {
        const url = new URL(path); // validate URL
        router.replace(`${url.origin}/dashboard`);
      } catch {
        router.replace("/dashboard"); // fallback
      }
    } else if (!token) {
      router.replace("/");
    }
  }, [token, path, router, storeToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardContent className="flex flex-col items-center py-8">
          <Loader2 className="animate-spin text-primary mb-6" size={48} />
          <div className="text-center mb-4">
            <h3 className="text-2xl font-semibold mb-2">Authenticating</h3>
            <p className="text-muted-foreground">
              Please wait while we verify your credentials
            </p>
          </div>
          <Progress value={100} className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
