// import React from "react";
// import Auth from '../utils/auth';
// import { useQuery } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';

// import Chatbox from "../components/Chatbox";
// import FriendList from "../components/FriendList";

// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";

const Chat = () => {
  // const { data: userData } = useQuery(QUERY_ME);
  // const loggedIn = Auth.loggedIn();

  return (
    <div>
      {/* <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} sx={{ width: "100%", height: "80vh" }}>
      {loggedIn && userData ? (
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
        ) : null} */}
        {/* <Chatbox></Chatbox> */}
      {/* </Grid> */}
    </div>
  );
};

export default Chat;
