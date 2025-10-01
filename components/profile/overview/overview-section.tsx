import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FileQuestion } from "lucide-react";
import { getFeed } from "@/components/grapqhl/action/feed";

interface OverviewSectionProps<T> {
  title: string;
  count: number;
  items: T[];
  icon: React.ElementType;
  emptyText: string;
  onViewMore: () => void;
  renderItem: (item: T) => React.ReactNode;
}

function OverviewSection<T>({
  title,
  count,
  items,
  icon: Icon,
  emptyText,
  onViewMore,
  renderItem,
}: OverviewSectionProps<T>) {
  const { data, loading, fetchMore, refetch } = getFeed({
    variables: {
      input: {
        offset: 2,
        limit: 2,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          {title} ({count})
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewMore}>
          View More
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length > 0 ? (
          items.map(renderItem)
        ) : (
          <div className="flex items-center space-x-2 text-gray-500">
            <FileQuestion className="w-5 h-5" />
            <span>{emptyText}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OverviewSection;
