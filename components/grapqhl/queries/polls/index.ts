import { gql } from "@apollo/client";

export const GET_POLL_BY_USER = gql`
  query GetPollByIdForUser($input: inputGetPollByIdForUser!) {
    getPollByIdForUser(input: $input) {
      id
      title
      question
      resultVisibility
      options {
        id
        text
        order
        votes
      }
      updatedAt
      createdAt
      endDate
      status
      totalVotes
      isVoted
      votedOptionId
    }
  }
`;

export const VOTE_POLL = gql`
  mutation VoteOnPoll($input: inputVoteOnPoll) {
    voteOnPoll(input: $input) {
      id
    }
  }
`;
