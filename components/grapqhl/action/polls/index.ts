
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_POLL_BY_USER, VOTE_POLL } from "../../queries/polls";

export const getPollByIdForUser = (options: any) =>
  useQuery(GET_POLL_BY_USER, options);

export const voteOnPoll = (options: any) =>
  useMutation(VOTE_POLL, {
    ...options,
  });
