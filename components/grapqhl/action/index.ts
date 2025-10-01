import { gql } from "@apollo/client";
import { COMPLETE_KYC, GET_USER, GET_ORG_DETAILS } from "../queries";
import { QueryResult, useMutation, useQuery } from "@apollo/client/react";

// Types for GetUser
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isApproved: boolean;
  isRequested: boolean;
  avatar: string;
  cover: string;
  location: any;
  about: {
    headline: string;
  };
}
interface GetUserData {
  getUser: User;
}

// Types for GetOrgDetails
interface OrgDetails {
  name: string;
  logo: string;
  favicon: string;
}
interface GetOrgDetailsData {
  getOrgDetails: OrgDetails;
}

// Types for CompleteKyc
interface CompleteKycInput {
  // define fields as per your schema
}
interface CompleteKycData {
  completeKyc: {
    success: boolean;
  };
}

export const useGetUser = (
  options?: useQuery.Options<GetUserData>
): useQuery.Result<GetUserData> => useQuery(GET_USER, options);

export const useGetOrgDetails = (
  options?: useQuery.Options<GetOrgDetailsData>
): useQuery.Result<GetOrgDetailsData> => useQuery(GET_ORG_DETAILS, options);

export const useCompleteKyc = (
  options?: useMutation.Options<CompleteKycData, { input: CompleteKycInput }>
): useMutation.Result<CompleteKycData> => useMutation(COMPLETE_KYC, options);

export const SWITCH_ACCOUNT = gql`
  mutation SwitchAccount($input: inputSwitchAccount) {
    switchAccount(input: $input) {
      token
      domain
      theme {
        colorPrimary
      }
    }
  }
`;
export const switchUserAccount = (options: any) =>
  useMutation(SWITCH_ACCOUNT, options);
