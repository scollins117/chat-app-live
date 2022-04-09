import React, { useState } from "react";
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC } from '../utils/queries';

import { Box } from "@chakra-ui/layout";

import Header from "../components/Header"
import Chatbox from "../components/Chatbox";
import FriendList from "../components/FriendList";

const Chat = () => {
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const loggedIn = Auth.loggedIn();
  console.log()

  return (
    <div style={{ width: "100%" }}>
      {loggedIn && <Header />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {/* {loggedIn && <MyChats/>}
        {loggedIn && (
          <Chatbox/>
        )} */}
      </Box>
    </div>
  );

  // return (
  //   <div>
  //     <Grid container>
  //       <Grid item xs={12}>
  //         <Typography variant="h5" className="header-message">
  //           Chat
  //         </Typography>
  //       </Grid>
  //     </Grid>
  //     <Grid container component={Paper} sx={{ width: "100%", height: "80vh" }}>
  //     {loggedIn && userData ? (
  //           <FriendList
  //             username={userData.me.username}
  //             friendCount={userData.me.friendCount}
  //             friends={userData.me.friends}
  //           />
  //       ) : null} */}
  //       <Chatbox></Chatbox>
  //      </Grid>
  //   </div>
  // );
};

export default Chat;
