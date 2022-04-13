import React, { useEffect } from "react";

import { Box } from "@chakra-ui/layout";
import { useQuery } from "@apollo/client";

import Header from "../components/Header";
import Chatbox from "../components/Chatbox";
import FriendList from "../components/FriendList";

import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useChatContext } from "../utils/GlobalState";
import { UPDATE_ME } from "../utils/actions";


const Chat = () => {
  const loggedIn = Auth.loggedIn();
  const [state, dispatch] = useChatContext();

  const { data } = useQuery(QUERY_ME);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_ME,
        me: data.me,
      });
    }
  }, [data, dispatch]);

 
  return (
    <div style={{ width: "100%" }}>
      {loggedIn &&  (
        <Header/>
      )}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {loggedIn &&  <FriendList />}
        {loggedIn &&  <Chatbox/>}
      </Box>
    </div>
  );
};

export default Chat;
