const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chatMessages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
