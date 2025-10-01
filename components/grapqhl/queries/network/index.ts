const details = `
   id
      firstName
      lastName
      avatar
      status
      user {
        about {
          about
          bio
          currentPosition
          instagram
          linkedin
          portfolio
        }
        profile {
          education {
            id
            school
            degree
            grade
            activities
            description
            duration
          }
          experience {
            id
            companyName
            duration
            employmentType
            location
            locationType
            title
          }
        }
        lastName
        isOnline
        firstName
        avatar
      }
      activity {
        id
        repostId
        source
        privacy
        isLiked
        isWishList
        isOwner
        media
        totalComment
        totalReactions
        totalReShare
        description
        createdAt
        marketPlace {
          category
          condition
          description
          createdAt
          location {
            logo
            name
            state
            country
          }
          price
          media
          title
        }
        group {
          id
          cover
          title
        }
        job {
          createdAt
          id
          title
          company {
            name
            logo
          }
          salary
          description
          location {
            country
            state
            name
          }
          jobType
          workplaceType
        }
        user {
          id
          about {
            currentPosition
          }
          avatar
          firstName
          lastName
        }
      
    }
`;

import { gql } from "@apollo/client";
import { privacy } from "../feed";

export const GET_NETWORK = gql`
  query GetNetwork {
    getNetwork {
      avatar
      firstName
      lastName
      isOnline
      designation
      id
      status
      cover
    }
  }
`;

export const SEND_CONNECTION = gql`
  mutation ConnectAsConnection($input: inputId) {
    connectAsConnection(input: $input) {
      id
      status
    }
  }
`;

export const ACCEPT_CONNECTION = gql`
  mutation AcceptConnection($input: inputId) {
    acceptConnection(input: $input) {
      id
      status
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query GetUserDetails($input: inputId) {
    getUserDetails(input: $input) {
      ${details}
    }
  }
`;
