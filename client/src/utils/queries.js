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
        from
      }
      friends {
        _id
        username
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
      messageText
      createdAt
      username
    }
  }
`;

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

// export const QUERY_SEARCH = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//     }
//   }
// `;
