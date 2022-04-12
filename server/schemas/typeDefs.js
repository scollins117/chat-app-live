const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    messages: [Message]
    friends: [User]
  }

  type Message {
    _id: ID
    chat: Chat
    sender: User
    messageText: String
    createdAt: String
  }

  type Chat {
    _id: ID
    chatName: String
    users: [User]
    chatMessages: [Message]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    chat(_id: ID!): Chat
    chats: [Chat]
    users: [User]
    search: [User]
    user(username: String!): User
    messages: [Message]
    message(_id: ID!): Message
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addMessage(messageText: String!, chatId: ID!): Message
    addFriend(friendId: ID!): User
    addChat(chatName: String!, userId: ID!): Chat
  }
`;

module.exports = typeDefs;
