import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: React.ElementType;
}

const SocialLinks = ({ links }: { links: SocialLink[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Social Media</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-4">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:underline"
        >
          <link.icon className="w-5 h-5" />
          <span>{link.label}</span>
        </a>
      ))}
    </CardContent>
  </Card>
);

export default SocialLinks;
