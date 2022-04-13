import React, { createContext, useContext } from "react";
import { useChatReducer } from "./reducers";

const ChatContext = createContext();
const { Provider } = ChatContext;

const ChatProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useChatReducer({
    showOpen: false,
    chatOpen: false,
    currentFriend: "",
    me: {},
    chat: {},
    messages: [],
    friends: [],
    currentChat: "",
  });
  // use this to confirm it works!
  console.log("Global State: ", state);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChatContext };
