import * as React from "react";
import { cn } from "@/lib/utils"; // shadcn/ui utility for className merging

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h2 className={cn("font-bold text-xl sm:text-2xl mb-3", className)}>
      {children}
    </h2>
  );
};

export default CardTitle;
