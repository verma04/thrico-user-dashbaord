import { useEffect, useState } from "react";

export function usePrimaryColor() {
  const [primary, setPrimary] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    // Try to read from CSS variables (shadcn uses these by default)
    const val =
      getComputedStyle(root).getPropertyValue("--primary").trim() ||
      getComputedStyle(root).getPropertyValue("--shadcn-primary").trim();

    setPrimary(val || null);
  }, []);

  return primary;
}
