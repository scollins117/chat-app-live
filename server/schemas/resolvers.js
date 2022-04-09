const { AuthenticationError } = require("apollo-server-express");
const { User, Message } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    // // search all users
    // search: async (parent, keyword, context) => {
    //   return User.find(keyword).find({ _id: { $ne: context.user._id } })
    //     .select("-__v -password")
    //     .populate("messages")
    //     .populate("friends");
    // },

    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("messages")
        .populate("friends");
    },
    
    // get one users
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("messages")
        .populate("friends");
    },

    // get message with param option username
    messages: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Message.find(params).sort({ createdAt: -1 });
    },

    // get a single message
    message: async (parent, { _id }) => {
      return Message.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    sendMessage: async (parent, args, context) => {
      if (context.user) {
        const message = await Message.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { messages: message._id } },
          { new: true }
        );

        return message;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        console.log("my id: ", context.user._id);
        console.log("friend id: ", friendId);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
