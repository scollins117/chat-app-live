import React, { createContext, useContext } from "react";
import { useChatReducer } from './reducers';

const ChatContext = createContext();
const { Provider } = ChatContext;

const ChatProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useChatReducer({
    showOpen: false,
    chatOpen: false,
    chatOn: [],
    friends: [],
    currentFriend: '',
    currentChat: '',
  });
  // use this to confirm it works!
  console.log("Global State: ", state);
  console.log("Dispatch: ", dispatch);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChatContext };