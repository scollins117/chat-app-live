import React, { createContext, useContext } from "react";
import { useChatReducer } from './reducers';

const ChatContext = createContext();
const { Provider } = ChatContext;

console.log("ChatContext: ", ChatContext)

const ChatProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useChatReducer({
    showOpen: false,
    chatOpen: false,
    chatOn: [],
    currentFriend: '',
  });
  // use this to confirm it works!
  console.log("state: ", state);
  console.log("dispatch: ", dispatch);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChatContext };