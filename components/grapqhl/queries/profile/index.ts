import { gql } from "@apollo/client";

export const GET_PROFILE_TAGS = gql`
  query Query {
    getProfileTag
  }
`;

export const UPDATE_PROFILE_TAGS = gql`
  mutation EditProfileTag($input: profileTag) {
    editProfileTag(input: $input)
  }
`;

export const UPDATE_COVER_IMAGE = gql`
  mutation UpdateProfileCover($input: inputUpdateProfileCover!) {
    updateProfileCover(input: $input) {
      cover
    }
  }
`;
export const UPDATE_AVATAR = gql`
  mutation UpdateProfileAvatar($input: inputUpdateProfileAvatar!) {
    updateProfileAvatar(input: $input) {
      avatar
    }
  }
`;
export const UPDATE_PROFILE_DETAILS = gql`
  mutation UpdateProfileDetails($input: inputProfileDetails) {
    updateProfileDetails(input: $input) {
      user {
        id
        firstName
        avatar
        lastName
        about {
          currentPosition
          bio
          linkedin
          instagram
          portfolio
          about
          pronouns
          headline
        }
        isOnline
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
        cover
      }
    }
  }
`;

export const GET_PROFILE_INFO = gql`
  query Profile {
    getProfileInfo {
      profile {
        country
        language
        phone {
          areaCode
          countryCode
          isoCode
          phoneNumber
        }

        DOB
        gender
        pronouns
        headline
        currentPosition
        education {
          id
          school {
            id
            logo
            name
          }
          degree
          grade
          activities
          description
          duration
        }
        experience {
          id
          company {
            id
            logo
            name
          }
          duration
          employmentType
          locationType
          title
          startDate
          currentlyWorking
          location
        }
        categories
        skills
      }
    }
  }
`;
