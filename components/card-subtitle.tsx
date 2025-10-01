import * as React from "react";
import { cn } from "@/lib/utils"; // shadcn/ui utility for className merging

interface CardSubTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardSubTitle: React.FC<CardSubTitleProps> = ({ children, className }) => {
  return <h3 className={cn("font-medium", className)}>{children}</h3>;
};

export default CardSubTitle;
