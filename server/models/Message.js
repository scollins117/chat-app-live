const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema(
  {
    messageText: {
      type: String,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
