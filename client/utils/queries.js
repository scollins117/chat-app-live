import { gql } from '@apollo/client';

export const QUERY_MESSAGES = gql`
  query messages($username: String) {
    messages(username: $username) {
      _id
      messageText
      createdAt
      username
    }
  }
`;