import { gql } from "@apollo/client";

export const GET_NOTIFICATION = gql`
  query Result {
    getUserNotification {
      unread
      result {
        id
        notificationType
        createdAt
        feed {
          id
        }
        content
        sender {
          firstName
          avatar
          lastName
        }
      }
    }
  }
`;

export const MARK_NOTIFICATION_AS_SEEN = gql`
  query MarkNotificationAsSeen {
    markNotificationAsSeen {
      status
    }
  }
`;
export const UN_SEEN_NOTIFICATION = gql`
  query Query {
    unSeenNotification
  }
`;
