import { gql } from "@apollo/client";

export const GET_ALL_JOBS = gql`
  query GetAllJobs {
    getAllJobs {
      id
      jobTitle
      slug
      location
      jobType
      workplaceType
      salary
      company
    }
  }
`;

export const POST_JOB = gql`
  mutation PostJob($input: tag) {
    postJob(input: $input) {
      id
      jobTitle
      slug
      location
      jobType
      workplaceType
      salary
      company
    }
  }
`;

export const JOBS_POSTED_BY_ME = gql`
  query GetJobPostedByMe {
    getJobPostedByMe {
      id
      jobTitle
      slug
      location
      company
      jobType
      workplaceType
      salary
      description
      experience
    }
  }
`;

export const DUPLICATE_JOB = gql`
  mutation DuplicateJob($input: inputID) {
    duplicateJob(input: $input) {
      id
      jobTitle
      slug
      location
      company
      jobType
      workplaceType
      salary
      description
      experience
    }
  }
`;

export const APPLY_JOB = gql`
  mutation ApplyJob($input: applyJobInput) {
    applyJob(input: $input) {
      success
    }
  }
`;
