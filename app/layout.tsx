import type React from "react";
import type { Metadata } from "next";
import { Lato, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { WelcomeCelebration } from "@/components/succes/welcome-celebration";
import getData from "./server/get-details"; // updated import
import Script from "next/script";
import { ApolloWrapper } from "@/utils/apollo-provider";

// Font setup
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Make metadata async and fetch details
export async function generateMetadata(): Promise<Metadata> {
  try {
    const details = await getData();
    return {
      title: `${details?.name} - Build Your Community, Together`,
      description:
        "Connect, collaborate, and grow with like-minded individuals. Join thousands of professionals building meaningful relationships.",
    };
  } catch (error) {
    console.log(error);
    return {
      title: "404",
      description: "Page not found. The requested resource could not be found.",
    };
  }
}

// Simple 404 fallback component
function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, something went wrong.</p>
    </div>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let theme: Record<string, string> = {};
  let faviconUrl: string | undefined;

  try {
    const data = await getData();

    // Use the theme from getData (already has OKLCH primaryColor)
    theme = {
      primary: data.theme?.primaryColor,
    };

    // Get favicon URL from API data (adjust property as needed)
    faviconUrl = `https://cdn.thrico.network/${data.logo}` || "/favicon.ico";
  } catch {
    return (
      <html lang="en" className={`${lato.variable} ${spaceGrotesk.variable}`}>
        <body className={`${spaceGrotesk.className} ${lato.className}`}>
          <NotFound />
        </body>
      </html>
    );
  }

  const cssVars = Object.entries(theme)
    .map(([key, val]) => `--${key}: ${val};`)
    .join(" ");

  return (
    <html lang="en" className={`${lato.variable} ${spaceGrotesk.variable}`}>
      <head>
        <style>{`:root { ${cssVars} }`}</style>
        <link rel="icon" href={faviconUrl} sizes="any" />
      </head>
      <body className={`${spaceGrotesk.className} ${lato.className}`}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
        <ApolloWrapper>
          <WelcomeCelebration />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
