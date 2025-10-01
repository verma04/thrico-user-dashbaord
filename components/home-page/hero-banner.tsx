import React from "react";
import { Globe } from "../ui/globe";

import HeroButton from "./button";

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-primary via-primary/80 to-primary/60 text-white py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="font-bold mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Build Your Community,
              <span className="text-yellow-300 block sm:inline"> Together</span>
            </h1>
            <p className="mb-6 text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100">
              Connect, collaborate, and grow with like-minded individuals. Join
              thousands of professionals building meaningful relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justity-start items-center sm:items-start">
              <HeroButton />
            </div>
          </div>
          {/* Globe section, hidden on mobile */}
          <div className="relative mt-8 lg:mt-0 h-[35rem] hidden lg:block">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr   animate-tilt">
              {/* Replace Image with GlobeDemo */}
              <Globe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
