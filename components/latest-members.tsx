import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marquee } from "./ui/marquee";
import { faker } from "@faker-js/faker";

const members = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Figma",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Marcus Johnson",
    role: "Full Stack Developer",
    company: "Stripe",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Elena Rodriguez",
    role: "Data Scientist",
    company: "Netflix",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "David Kim",
    role: "Product Manager",
    company: "Google",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

const firstRow = members.slice(0, Math.ceil(members.length / 2));
const secondRow = members.slice(Math.ceil(members.length / 2));

const MemberCard = ({
  avatar,
  name,
  role,
  company,
}: {
  avatar: string;
  name: string;
  role: string;
  company: string;
}) => (
  <figure
    className={cn(
      "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
      "border-gray-950/[.1] bg-gray-50 hover:bg-gray-100",
      "dark:border-gray-50/[.1] dark:bg-gray-900 dark:hover:bg-gray-800"
    )}
  >
    <div className="flex flex-row items-center gap-3 mb-2">
      <Avatar className="w-12 h-12">
        <AvatarImage src={faker.image.avatar()} alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <figcaption className="text-base font-semibold">{name}</figcaption>
        <span className="text-xs text-gray-500">{role}</span>
      </div>
    </div>
    <blockquote className="text-sm text-gray-700">{company}</blockquote>
  </figure>
);

export default function LatestMembers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Latest Members
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome our newest community members
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((member, idx) => (
              <MemberCard key={idx} {...member} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((member, idx) => (
              <MemberCard key={idx} {...member} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-50"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-50"></div>
        </div>
      </div>
    </section>
  );
}
