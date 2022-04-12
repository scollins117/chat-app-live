import React, { useEffect } from "react";

import { Box } from "@chakra-ui/layout";
import { useQuery } from "@apollo/client";

import Header from "../components/Header";
import Chatbox from "../components/Chatbox";
import FriendList from "../components/FriendList";

import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useChatContext } from "../utils/GlobalState";
import { UPDATE_FRIENDS } from "../utils/actions";

const Chat = () => {
  const loggedIn = Auth.loggedIn();
  const [state, dispatch] = useChatContext();

  const { friends } = state;

  const { loading, data } = useQuery(QUERY_ME);
  if (!loading) {
    console.log("my friends list from global state: ", friends);
    console.log("QUERY_ME data: ", data);
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_FRIENDS,
        friends: data.me.friends,
      });
    }
  }, [data, dispatch]);

  return (
    <div style={{ width: "100%" }}>
      {loggedIn && !loading && data !== null && (
        <Header username={data.me.username} email={data.me.email} />
      )}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {loggedIn && !loading && <FriendList data={data} />}
        {loggedIn && !loading && <Chatbox user={data.me._id} />}
      </Box>
    </div>
  );
};

export default Chat;
