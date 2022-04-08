import React from "react";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const FriendList = ({ friendCount, username, friends }) => {
  // if (!friends || !friends.length) {
  //   return <ListItemText primary={`${username} has no friends`} />;
  // }

  return (
    <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
      <List>
        <ListItem button key="RemySharp">
          <ListItemIcon>
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          </ListItemIcon>
          <ListItemText primary={`${username} friend list`}></ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Grid item xs={12} style={{ padding: "10px" }}>
        <TextField
          id="outlined-basic-email"
          label="Search"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Divider />
      <List>
        <ListItem button key="RemySharp">
          <ListItemIcon>
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          </ListItemIcon>
          <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
          <ListItemText secondary="online" align="right"></ListItemText>
        </ListItem>
        <ListItem button key="Alice">
          <ListItemIcon>
            <Avatar
              alt="Alice"
              src="https://material-ui.com/static/images/avatar/3.jpg"
            />
          </ListItemIcon>
          <ListItemText primary="Alice">Alice</ListItemText>
        </ListItem>
        <ListItem button key="CindyBaker">
          <ListItemIcon>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
            />
          </ListItemIcon>
          <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
        </ListItem>
      </List>
    </Grid>
  );

  // return (
  //   <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
  //     <nav aria-label="main mailbox folders">
  //       <List>
  //         <h5>
  //           {username}'s {friendCount}{" "}
  //           {friendCount === 1 ? "friend" : "friends"}
  //         </h5>
  //         {friends ? (
  //           friends.map((friend) => (
  //             <ListItem disablePadding>
  //               <ListItemButton key={friend._id}>
  //                 <Link to={`/profile/${friend.username}`}>
  //                   {" "}
  //                   <ListItemText primary={friend.username} />{" "}
  //                 </Link>
  //               </ListItemButton>
  //             </ListItem>
  //           ))
  //         ) : (
  //           <ListItem disablePadding>
  //             <ListItemButton>
  //                 <ListItemText primary={`${username} has no friends`} />
  //             </ListItemButton>
  //           </ListItem>
  //         )}
  //       </List>
  //     </nav>
  //   </Box>
  // );

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
