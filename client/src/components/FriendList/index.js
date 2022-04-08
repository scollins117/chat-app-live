import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const FriendList = ({ friendCount, username, friends }) => {
  // if (!friends || !friends.length) {
  //   return <ListItemText primary={`${username} has no friends`} />;
  // }

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <h5>
            {username}'s {friendCount}{" "}
            {friendCount === 1 ? "friend" : "friends"}
          </h5>
          {friends ? (
            friends.map((friend) => (
              <ListItem disablePadding>
                <ListItemButton key={friend._id}>
                  <Link to={`/profile/${friend.username}`}>
                    {" "}
                    <ListItemText primary={friend.username} />{" "}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem disablePadding>
              <ListItemButton>
                  <ListItemText primary={`${username} has no friends`} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </nav>
    </Box>
  );

  // return (
  //   <div>
  //     <h5>
  //       {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
  //     </h5>
  // {friends.map(friend => (
  //  <ListItem disablePadding>
  //   <ListItemButton key={friend._id}>
  //     <Link to={`/profile/${friend.username}`}> <ListItemText primary={friend.username} /> </Link>
  //   </ListItemButton>
  //  </ListItem>
  // ))}
  //   </div>
  // );
};

export default FriendList;
