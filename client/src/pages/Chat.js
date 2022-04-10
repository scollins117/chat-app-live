import React, { useState } from "react";
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import { Box } from "@chakra-ui/layout";

import Header from "../components/Header"
import Chatbox from "../components/Chatbox";
import FriendList from "../components/FriendList";

const Chat = () => {
  const loggedIn = Auth.loggedIn();
  console.log()

  const { loading, data } = useQuery(QUERY_ME);
  // const [selectedUser, setSelectedUser] = useState();
  

  return (
    <div style={{ width: "100%" }}>
      {loggedIn && !loading && <Header username={data.me.username} email={data.me.email}/>}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
         {loggedIn && !loading && <FriendList data={data}/>}
        {loggedIn && (
          <Chatbox/>
        )}
      </Box>
    </div>
  );
};

export default Chat;
