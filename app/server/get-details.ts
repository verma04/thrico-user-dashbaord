"use server";

import { getClient } from "@/utils/apollo-client";
import { gql } from "@apollo/client";
import { headers } from "next/headers";
import { cache } from "react";
import { converter } from "culori";

// In-memory cache (for demonstration; consider a persistent cache for production)
const domainCache = new Map<string, any>();

// Define the query
const query = gql`
  query CheckDomain($domain: String) {
    checkDomain(domain: $domain) {
      logo
      name
      favicon
      theme {
        primaryColor
      }
    }
  }
`;

// Fetch the data with caching and handle errors
export const getData = cache(async () => {
  const headerData = headers();
  const authorization = (await headerData).get("x-forwarded-host");

  if (!authorization) {
    throw new Error("Authorization header not found");
  }

  // Check cache first
  if (domainCache.has(authorization)) {
    return domainCache.get(authorization);
  }

  try {
    const { data, errors } = await getClient().query({
      query,
      variables: { domain: authorization },
    });

    if (errors && errors.length > 0) {
      console.error("GraphQL Errors:", JSON.stringify(errors, null, 2));
      throw new Error("Failed to fetch data: GraphQL error");
    }

    if (!data?.checkDomain) {
      throw new Error("Failed to fetch data: No checkDomain returned");
    }

    // Convert primaryColor to OKLCH if present
    const checkDomain = {
      ...data.checkDomain,
      theme: data.checkDomain.theme
        ? { ...data.checkDomain.theme }
        : "#000000 ",
    };
    if (checkDomain?.theme?.primaryColor) {
      checkDomain.theme.primaryColor = hexToOKLCH(
        checkDomain.theme.primaryColor
      );
    }

    // Set cache
    domainCache.set(authorization, checkDomain);

    return checkDomain;
  } catch (error) {
    console.error("Apollo Client Error:", error);
    throw new Error("Failed to fetch data");
  }
});

export default getData;

// Converts hex color to OKLCH string
function hexToOKLCH(hex: string): string {
  const toOklch = converter("oklch");
  const oklch = toOklch(hex);
  if (!oklch) return hex;
  // Format: oklch(<lightness>% <chroma> <hue>)
  const l = (oklch.l * 100).toFixed(3);
  const c = oklch.c.toFixed(5);
  const h = oklch.h !== undefined ? oklch.h.toFixed(3) : "0";
  return `oklch(${l}% ${c} ${h})`;
}

export async function getThemeFromBackend() {
  // Imagine this is from your backend
  const backendTheme = {
    primary: "#000000",
  };

  const themeOKLCH = Object.fromEntries(
    Object.entries(backendTheme).map(([key, hex]) => [key, hexToOKLCH(hex)])
  );

  return themeOKLCH;
}
