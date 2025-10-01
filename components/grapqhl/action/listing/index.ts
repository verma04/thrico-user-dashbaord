import { gql } from "@apollo/client";
import { ADD_LISTING } from "../../queries/marketplace";
import { MutationHookOptions, QueryHookOptions, useMutation, useQuery } from "@apollo/client/react";

// Define the types for your mutation input and result
// Replace these with the actual types for your AddListing mutation
type AddListingInput = {
  input: {
    title: string;
    description: string;
    condition: string;
    category: string;
    price: number;
    createdAt: string;
    media: string[];
    location: string;
  };
};

type AddListingData = {
  addListing: {
    title: string;
    description: string;
    condition: string;
    category: string;
    price: number;
    createdAt: string;
    media: string[];
    location: string;
  };
};

export const useAddListing = (
  options?: MutationHookOptions<AddListingData, AddListingInput>
): [
  (input: AddListingInput["input"]) => Promise<any>,
  ReturnType<typeof useMutation>[1]
] => {
  const [mutate, result] = useMutation<AddListingData, AddListingInput>(ADD_LISTING, options);

  const addListing = (input: AddListingInput["input"]) => {
    return mutate({ variables: { input } });
  };

  return [addListing, result];
};

// 1. Define the GraphQL query
export const GET_ALL_LISTINGS = gql`
  query Listings {
    getAllListing {
      listings {
        details {
          id
          title
          description
          location
          condition
          category
          price
          createdAt
          media
          currency
        }
        isFeatured
        isWishList
        isTrending
        id
        user {
          id
          firstName
          lastName
          avatar
        }
      }
      pagination {
        currentPage
        hasNextPage
        hasPreviousPage
        limit
        totalCount
        totalPages
      }
    }
  }
`;

// 2. Define TypeScript types for the query result
type ListingDetails = {
  id: string;
  title: string;
  description: string;
  location: string;
  condition: string;
  category: string;
  price: number;
  createdAt: string;
  media: string[];
   currency: string;
};

 export type Listing = {
  details: ListingDetails;
  isFeatured: boolean;
  isWishList: boolean;
  isTrending: boolean;
  id: string;
  user: User | null;
};

type Pagination = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  totalCount: number;
  totalPages: number;
};

type GetAllListingData = {
  getAllListing: {
    listings: Listing[];
    pagination: Pagination;
  };
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

// 3. Create a custom hook to use the query
export const useGetAllListings = (
  options?: useQuery.Options<GetAllListingData>
) => {
  return useQuery<GetAllListingData>(GET_ALL_LISTINGS, options);
};
