import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($messageText: String!, $chatId: ID!) {
    addMessage(messageText: $messageText, chatId: $chatId) {
      chat {
        _id
        users {
          _id
        }
      }
      sender {
        username
        _id
      }
      _id
      messageText
      createdAt
    }
  }
`;

export const ADD_FRIEND_DB = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_OR_ACCESS_CHAT = gql`
  mutation addChat($chatName: String!, $userId: ID!) {
    addChat(chatName: $chatName, userId: $userId) {
      _id
      chatName
      users {
        _id
        username
      }
      chatMessages {
        _id
        messageText
      }
    }
  }
`;
