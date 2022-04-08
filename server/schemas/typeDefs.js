const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    messages: [Message]
  }

  type Message {
    _id: ID
    messageText: String
    createdAt: String
    from: String
    to: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    messages: [Message]
    message(_id: ID!): Message
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    sendMessage(messageText: String!): Message
    addFriend(friendId: ID!): User
  }

  type Subscription {
    messageSent: Message
  }
`;

module.exports = typeDefs;
