"use server";

import { getClient } from "@/apollo/apollo-client";
import { gql } from "@apollo/client";

import { cache } from "react";

// Define the query
const query = gql`
  query GetCommunityDetails($input: inputId) {
    getCommunityDetails(input: $input) {
      id
    }
  }
`;

// Fetch the data with caching and handle errors
export const getCommunity = cache(async (id: string) => {
  // Apollo Client query with error handling
  const { data, errors } = await getClient().query({
    query,
    variables: {
      input: {
        id: id,
      },
    },
  });
  if (errors) {
    throw new Error("Failed to fetch data");
  }

  return data;
});

export default getCommunity;
