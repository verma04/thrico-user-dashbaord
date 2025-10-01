import { gql } from "@apollo/client";

export const START_CHAT = gql`
  mutation StartChat($input: chatID) {
    startChat(input: $input) {
      id
    }
  }
`;
export const GET_INBOX = gql`
  query GetInbox {
    getInbox {
      id
      sender {
        id
        firstName
        avatar
        lastName
      }
      message {
        content
        createdAt
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessageInChat($input: inputSendMessage) {
    sendMessageInChat(input: $input) {
      id
    }
  }
`;

export const GET_ALL_MESSAGES = gql`
  query GetAllMessages($input: messageID) {
    getAllMessages(input: $input) {
      id
      content
      sender {
        id
        firstName
        avatar
        lastName
      }
      messageType
      createdAt
    }
  }
`;
