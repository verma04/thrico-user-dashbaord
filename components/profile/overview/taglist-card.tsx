import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const TagListCard = ({
  title,
  tags,
  colorClass,
}: {
  title: string;
  tags: string[];
  colorClass: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`${colorClass} px-3 py-1 rounded-full text-sm`}
        >
          {tag}
        </span>
      ))}
    </CardContent>
  </Card>
);

export default TagListCard;
