"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Add Image import if using next/image
import Image from "next/image";
import { useGetUser } from "./grapqhl/action";
import ProfileMenu from "./ProfileMenu"; // Create this with shadcn/ui primitives
import LoginButton from "./LoginButton"; // Create this with shadcn/ui primitives

export function Navbar({ data }: { data: { logo: string; name: string } }) {
  const { data: { getUser } = {}, error, loading } = useGetUser();

  console.log("Navbar user:", getUser);
  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href={"/"}>
              {data?.logo && (
                <Image
                  src={`https://cdn.thrico.network/${data?.logo}`}
                  alt={`${data.name} logo`}
                  width={100}
                  height={100}
                  className="w-30 h-30 rounded-lg object-contain"
                  priority
                />
              )}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#events"
              className="text-gray-600 hover:text-gray-900 nav-text-small"
            >
              Events
            </Link>
            <Link
              href="#groups"
              className="text-gray-600 hover:text-gray-900 nav-text-small"
            >
              Groups
            </Link>
            <Link
              href="#jobs"
              className="text-gray-600 hover:text-gray-900 nav-text-small"
            >
              Jobs
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 nav-text-small"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 nav-text-small"
            >
              Contact
            </Link>
            <Link
              href="/news"
              className="text-gray-600 hover:text-gray-900 nav-text-small"
            >
              News
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {getUser ? (
                  <ProfileMenu getUser={getUser} />
                ) : (
                  <>
                    <LoginButton>
                      <Button variant="default" className="button-text-small">
                        Get Started
                      </Button>
                    </LoginButton>
                    <LoginButton>
                      <Button variant="outline" className="button-text-small">
                        Sign In
                      </Button>
                    </LoginButton>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
