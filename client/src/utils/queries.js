import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      messages {
        _id
        messageText
        createdAt
      }
      friends {
        _id
        username
        email
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      messages {
        _id
        chat
        sender
        messageText
        createdAt
      }
    }
  }
`;
export const QUERY_MESSAGE = gql`
  query message($id: ID!) {
    message(_id: $id) {
      _id
      chat
      sender
      messageText
      createdAt
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages($username: String) {
    messages(username: $username) {
      _id
      chat
      sender
      messageText
      createdAt
    }
  }
`;

export const QUERY_SEARCH = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_CHATS = gql`
  {
    chats {
      _id
      chatName
      users {
        _id
        username
      }
      chatMessages {
        messageText
      }
    }
  }
`;

export const QUERY_CHAT = gql`
  {
    chats {
      _id
      chatName
      users {
        _id
        username
      }
      chatMessages {
        sender {
          username
        }
        messageText
      }
    }
  }
`;
