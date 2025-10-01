import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CelebrationProps {
  celebration: {
    description: string;
    cover: string;
  };
}

const Celebration: React.FC<CelebrationProps> = ({ celebration }) => {
  if (!celebration) return null;

  return (
    <div className="p-2  m-1  gap-2 flex flex-col items-center">
      <CardContent className="flex flex-col items-center gap-2 p-0 w-full">
        <h2>{celebration.description}</h2>
        <img
          src={celebration.cover}
          alt="Celebration Cover"
          className="w-full h-46 rounded-lg object-cover"
        />
      </CardContent>
    </div>
  );
};

export default Celebration;
