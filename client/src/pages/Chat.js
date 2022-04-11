import React, { useEffect } from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import { Box } from "@chakra-ui/layout";

import Header from "../components/Header";
import Chatbox from "../components/Chatbox";
import FriendList from "../components/FriendList";

import { useChatContext } from "../utils/GlobalState";
import { UPDATE_FRIENDS } from "../utils/actions";

const Chat = () => {
  const loggedIn = Auth.loggedIn();
  const [state, dispatch] = useChatContext();

  const { friends } = state;

  const { loading, data } = useQuery(QUERY_ME);
  if (!loading) {
    console.log("my friends list from global state: ", friends);
    console.log("QUERY_ME data: ", data)
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_FRIENDS,
        friends: data.me.friends,
      });
      console.log("My friends from global state: ", friends);
    }
  }, [data, dispatch]);

  return (
    <div style={{ width: "100%" }}>
      {loggedIn && !loading && data && (
        <Header username={data.me.username} email={data.me.email} />
      )}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {loggedIn && !loading && <FriendList data={data} />}
        {loggedIn && <Chatbox data={data} />}
      </Box>
    </div>
  );
};

export default Chat;
