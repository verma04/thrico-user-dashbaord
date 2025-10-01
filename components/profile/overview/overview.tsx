"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  School,
  Users,
  Calendar,
  Link as LinkIcon,
  Pencil,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
} from "lucide-react";
import React, { useState } from "react";
import RecentActivity from "./recent-activity";

// --- Types ---
interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}
interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}
interface Community {
  id: string;
  name: string;
  members: number;
  icon: string;
}
interface Event {
  id: string;
  name: string;
  date: string;
  attendees: number;
  icon: string;
}
interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  tags: string[];
  yearsOfExperience: number;
  description: string;
}

// --- ListCard ---
function ListCard({
  title,
  icon,
  items,
  renderItem,
  viewMore,
  onViewMore,
  onEdit,
}: {
  title: string;
  icon: React.ReactNode;
  items: any[];
  renderItem: (item: any, idx: number) => React.ReactNode;
  viewMore?: boolean;
  onViewMore?: () => void;
  onEdit?: () => void;
}) {
  return (
    <Card className="mb-6 pt-0 pb-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between bg-muted py-3 ">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="py-2">
        {items.length === 0 ? (
          <div className="text-muted-foreground text-sm px-2 py-3">
            No items yet.
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={item.id || idx}>{renderItem(item, idx)}</div>
          ))
        )}
        {viewMore && (
          <Button variant="link" className="px-0 mt-2" onClick={onViewMore}>
            View More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// --- SkillListCard ---
function SkillListCard({
  title,
  skills,
  onEdit,
}: {
  title: string;
  skills: Skill[];
  onEdit?: () => void;
}) {
  return (
    <Card className="mb-6 pt-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between bg-muted py-3 px-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="py-2">
        {skills.length === 0 ? (
          <div className="text-muted-foreground text-sm px-2 py-3">
            No skills yet.
          </div>
        ) : (
          skills.map((skill) => (
            <div key={skill.id} className="mb-3 bg-primary/5 rounded-lg p-3">
              <div className="font-medium text-primary">{skill.name}</div>
              <div className="text-xs text-muted-foreground mb-1">
                {skill.category.replace(/-/g, " ")} • {skill.level} •{" "}
                {skill.yearsOfExperience} yrs
              </div>
              {skill.tags && skill.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-1">
                  {skill.tags.map((tag, idx) => (
                    <span
                      key={tag + idx}
                      className="bg-primary/10 rounded px-2 py-0.5 text-xs text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {skill.description && (
                <div className="text-xs text-muted-foreground">
                  {skill.description}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

// --- TagListCard ---
function TagListCard({
  title,
  tags,
  onEdit,
}: {
  title: string;
  tags: string[];
  onEdit?: () => void;
}) {
  return (
    <Card className="mb-6 pt-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between bg-muted py-3 px-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2 py-3">
        {tags.length === 0 ? (
          <span className="text-muted-foreground text-sm">No tags yet.</span>
        ) : (
          tags.map((tag, idx) => (
            <span
              key={tag + idx}
              className="bg-primary/10 rounded-full px-3 py-1 text-xs text-primary font-medium"
            >
              {tag}
            </span>
          ))
        )}
      </CardContent>
    </Card>
  );
}

// --- Social Link Renderer ---
const renderSocialLink = (link: any) => (
  <div className="flex items-center gap-3 py-2" key={link.id}>
    <Avatar className="h-8 w-8 bg-muted">
      <AvatarFallback>
        {React.createElement(link.icon, { className: "h-4 w-4" })}
      </AvatarFallback>
    </Avatar>
    <div>
      <div className="font-medium">{link.label}</div>
      <a
        href={link.url}
        className="text-xs text-muted-foreground hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.url}
      </a>
    </div>
  </div>
);

// --- Main Overview ---
const Overview = () => {
  const educationEntries: Education[] = [
    {
      id: "edu1",
      degree: "Master of Design",
      school: "Stanford University",
      period: "2016 - 2018",
    },
    {
      id: "edu2",
      degree: "Bachelor of Arts in Graphic Design",
      school: "Rhode Island School of Design",
      period: "2012 - 2016",
    },
    {
      id: "edu3",
      degree: "High School Diploma",
      school: "Local High School",
      period: "2008 - 2012",
    },
  ];
  const experiences: Experience[] = [
    {
      id: "exp1",
      title: "Senior Product Designer",
      company: "Figma",
      period: "2022 - Present",
      description:
        "Leading design for core product features, managing design system, and mentoring junior designers.",
    },
    {
      id: "exp2",
      title: "Product Designer",
      company: "Stripe",
      period: "2020 - 2022",
      description:
        "Designed payment flows and dashboard experiences for small business customers.",
    },
    {
      id: "exp3",
      title: "UX Designer",
      company: "Airbnb",
      period: "2018 - 2020",
      description:
        "Worked on host onboarding and listing optimization features.",
    },
    {
      id: "exp4",
      title: "Junior Designer",
      company: "Startup X",
      period: "2017 - 2018",
      description: "Assisted in UI design for early-stage product.",
    },
  ];
  const communitiesCreated: Community[] = [
    {
      id: "comm1",
      name: "Design Systems Guild",
      members: 150,
      icon: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "comm2",
      name: "Fintech Innovators",
      members: 300,
      icon: "/placeholder.svg?height=24&width=24",
    },
  ];
  const eventsCreated: Event[] = [
    {
      id: "event1",
      name: "UX Workshop: Prototyping",
      date: "Oct 26, 2024",
      attendees: 50,
      icon: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "event2",
      name: "Product Design Meetup",
      date: "Nov 15, 2024",
      attendees: 80,
      icon: "/placeholder.svg?height=24&width=24",
    },
  ];
  const socialLinks = [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/sarah",
      icon: Linkedin,
    },
    {
      id: "twitter",
      label: "Twitter",
      url: "https://twitter.com/sarah",
      icon: Twitter,
    },
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/sarah",
      icon: Github,
    },
    {
      id: "dribbble",
      label: "Dribbble",
      url: "https://dribbble.com/sarah",
      icon: Dribbble,
    },
  ];
  const skills: Skill[] = [
    {
      id: "a687ac6f-1777-49e4-9593-04d34be2bef5",
      name: "UI/UX Design",
      category: "frameworks-libraries",
      level: "advanced",
      tags: ["Figma", "Sketch"],
      yearsOfExperience: 8,
      description: "Expert in designing user interfaces and experiences.",
    },
    {
      id: "b687ac6f-1777-49e4-9593-04d34be2bef5",
      name: "Prototyping",
      category: "tools",
      level: "intermediate",
      tags: ["InVision", "Adobe XD"],
      yearsOfExperience: 5,
      description: "Skilled in creating interactive prototypes.",
    },
    {
      id: "c687ac6f-1777-49e4-9593-04d34be2bef5",
      name: "Design Systems",
      category: "methodologies",
      level: "advanced",
      tags: ["Atomic Design", "Material Design"],
      yearsOfExperience: 7,
      description: "Experienced in building and maintaining design systems.",
    },
    {
      id: "d687ac6f-1777-49e4-9593-04d34be2bef5",
      name: "User Research",
      category: "research",
      level: "intermediate",
      tags: ["Usability Testing", "Surveys"],
      yearsOfExperience: 4,
      description: "Proficient in conducting user research and testing.",
    },
    {
      id: "e687ac6f-1777-49e4-9593-04d34be2bef5",
      name: "React",
      category: "programming-languages",
      level: "beginner",
      tags: ["JavaScript", "Frontend"],
      yearsOfExperience: 2,
      description: "Familiar with building user interfaces using React.",
    },
  ];
  const interests = [
    "Design Thinking",
    "Travel",
    "Photography",
    "Startups",
    "Mentorship",
  ];
  const expertise = [
    "Product Design",
    "Interaction Design",
    "Workshop Facilitation",
    "Design Leadership",
  ];

  // State for "View More" toggles
  const [showAllSocial, setShowAllSocial] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllExpertise, setShowAllExpertise] = useState(false);
  const [showAllInterests, setShowAllInterests] = useState(false);

  // --- Renderers ---
  const renderExperience = (job: Experience) => (
    <div className="flex items-center gap-3 py-2" key={job.id}>
      <Briefcase className="h-6 w-6 text-muted-foreground" />
      <div>
        <div className="font-medium">
          {job.title} at {job.company}
        </div>
        <div className="text-xs text-muted-foreground">{job.period}</div>
      </div>
    </div>
  );
  const renderEducation = (edu: Education) => (
    <div className="flex items-center gap-3 py-2" key={edu.id}>
      <School className="h-6 w-6 text-muted-foreground" />
      <div>
        <div className="font-medium">
          {edu.degree} from {edu.school}
        </div>
        <div className="text-xs text-muted-foreground">{edu.period}</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Experience */}

      <ListCard
        title="Recent Activity"
        icon={<Briefcase className="h-5 w-5 text-primary" />}
        items={experiences.slice(0, 1)}
        renderItem={RecentActivity}
        viewMore={true}
        onViewMore={() => {
          /* navigation.navigate('Experience') */
        }}
      />
      <ListCard
        title="Experience"
        icon={<Briefcase className="h-5 w-5 text-primary" />}
        items={experiences.slice(0, 2)}
        renderItem={renderExperience}
        viewMore={experiences.length > 2}
        onViewMore={() => {}}
        onEdit={() => {}}
      />

      {/* Education */}
      <ListCard
        title="Education"
        icon={<School className="h-5 w-5 text-primary" />}
        items={educationEntries.slice(0, 2)}
        renderItem={renderEducation}
        viewMore={educationEntries.length > 2}
        onViewMore={() => {}}
        onEdit={() => {}}
      />

      {/* Social Links */}
      <ListCard
        title="Social Links"
        icon={<LinkIcon className="h-5 w-5 text-primary" />}
        items={showAllSocial ? socialLinks : socialLinks.slice(0, 3)}
        renderItem={renderSocialLink}
        viewMore={socialLinks.length > 3}
        onViewMore={() => setShowAllSocial((v) => !v)}
        onEdit={() => {}}
      />

      {/* Skills */}
      <SkillListCard
        title="Skills"
        skills={showAllSkills ? skills : skills.slice(0, 5)}
        onEdit={() => {}}
      />
      {skills.length > 5 && (
        <Button
          variant="link"
          className="px-0 mb-2 mt-[-8px]"
          onClick={() => setShowAllSkills((v) => !v)}
        >
          {showAllSkills ? "View Less" : "View More"}
        </Button>
      )}

      {/* Expertise */}
      <TagListCard
        title="Expertise"
        tags={showAllExpertise ? expertise : expertise.slice(0, 5)}
        onEdit={() => {}}
      />
      {expertise.length > 5 && (
        <Button
          variant="link"
          className="px-0 mb-2 mt-[-8px]"
          onClick={() => setShowAllExpertise((v) => !v)}
        >
          {showAllExpertise ? "View Less" : "View More"}
        </Button>
      )}

      {/* Interests */}
      <TagListCard
        title="Interests"
        tags={showAllInterests ? interests : interests.slice(0, 5)}
        onEdit={() => {}}
      />
      {interests.length > 5 && (
        <Button
          variant="link"
          className="px-0 mb-2 mt-[-8px]"
          onClick={() => setShowAllInterests((v) => !v)}
        >
          {showAllInterests ? "View Less" : "View More"}
        </Button>
      )}
    </div>
  );
};

export default Overview;
