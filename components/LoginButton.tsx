
import { encryptToken } from "@/lib/encryption";
import Link from "next/link";
import { useUrl } from "nextjs-current-url";
import React from "react";

const LoginButton = ({ children }: { children: React.ReactNode }) => {
  const { href: currentUrl, pathname } = useUrl() ?? {};
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const id = currentUrl;
  const token = encryptToken({
    origin,
    currentUrl,
  });

  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_LOGIN_URL ? process.env.NEXT_PUBLIC_LOGIN_URL : "https://accounts.thrico.network"}/auth?token=${token}`}
    >
       {children}
    </Link>
  );
};

export default LoginButton;
