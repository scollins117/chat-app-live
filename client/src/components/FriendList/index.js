// import React, { useState } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import { ADD_FRIEND } from "../../utils/mutations";
// import { QUERY_USER, QUERY_ME } from "../../utils/queries";
// import Auth from "../../utils/auth";

// import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// import TextField from "@mui/material/TextField";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Avatar from "@mui/material/Avatar";
// import Fab from "@mui/material/Fab";

// const FriendList = ({ friendCount, username, friends }) => {
//   console.log("current user friends: ", friends);

//   const [searchedUser, setSearchedUser] = useState("");
//   let inputedUser = "";

//   const [addFriend] = useMutation(ADD_FRIEND);
//   const { loading, data, refetch, error } = useQuery(QUERY_USER, {
//     variables: { username: searchedUser },
//   });

//   const user = data?.me || data?.user || {};

//   const handleClick = async () => {
//     console.log("BUTTON CLICKED");
//     setSearchedUser(inputedUser);
//     console.log("Current Queried User: ", searchedUser);
//     console.log("user data present", Object.keys(user).length);

//     const handleAddFriend = async () => {
//       try {
//         console.log("user id to add:", user._id);
//         await addFriend({
//           variables: { id: user._id },
//         });
//       } catch (e) {
//         console.error(e);
//         console.log("COULD NOT ADD FRIEND");
//       }
//     };

//     if (Object.keys(user).length > 0) {
//       handleAddFriend();
//     }
//   };

//   const handleChange = (event) => {
//     inputedUser = event.target.value;
//     console.log(inputedUser);
//   };

//   // if (!friends || !friends.length) {
//   //   return <ListItemText primary={`${username} has no friends`} />;
//   // }

//   return (
//     <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
//       <List>
//         <ListItem button key="RemySharp">
//           <ListItemIcon>
//             <Avatar
//               alt="Remy Sharp"
//               src="https://material-ui.com/static/images/avatar/1.jpg"
//             />
//           </ListItemIcon>
//           <ListItemText primary={`${username} friend list`}></ListItemText>
//         </ListItem>
//       </List>
//       <Divider />
//       <Grid container>
//         <Grid item xs={10} style={{ padding: "10px" }}>
//           <TextField
//             id="outlined-basic-email"
//             label="Add Friend"
//             variant="outlined"
//             fullWidth
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={1} align="right" mt={1} ml={1}>
//           <Fab color="primary" aria-label="add" onClick={handleClick}>
//             {/* <SendIcon /> */}
//           </Fab>
//         </Grid>
//       </Grid>
//       <Divider />
//       <List>
//         {friends &&
//           friends.map((friend) => (
//             <ListItem button key={friend._id}>
//               <ListItemIcon>
//                 <Avatar
//                   alt="Remy Sharp"
//                   src="https://material-ui.com/static/images/avatar/2.jpg"
//                 />
//               </ListItemIcon>
//               <ListItemText primary={friend.username}>
//                 {friend.username}
//               </ListItemText>
//               <ListItemText secondary="online" align="right"></ListItemText>
//             </ListItem>
//           ))}
//       </List>
//     </Grid>
//   );

//   // return (
//   //   <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//   //     <nav aria-label="main mailbox folders">
//   //       <List>
//   //         <h5>
//   //           {username}'s {friendCount}{" "}
//   //           {friendCount === 1 ? "friend" : "friends"}
//   //         </h5>
//   //         {friends ? (
//   //           friends.map((friend) => (
//   //             <ListItem disablePadding>
//   //               <ListItemButton key={friend._id}>
//   //                 <Link to={`/profile/${friend.username}`}>
//   //                   {" "}
//   //                   <ListItemText primary={friend.username} />{" "}
//   //                 </Link>
//   //               </ListItemButton>
//   //             </ListItem>
//   //           ))
//   //         ) : (
//   //           <ListItem disablePadding>
//   //             <ListItemButton>
//   //                 <ListItemText primary={`${username} has no friends`} />
//   //             </ListItemButton>
//   //           </ListItem>
//   //         )}
//   //       </List>
//   //     </nav>
//   //   </Box>
//   // );

//   // return (
//   //   <div>
//   //     <h5>
//   //       {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
//   //     </h5>
//   // {friends.map(friend => (
//   //  <ListItem disablePadding>
//   //   <ListItemButton key={friend._id}>
//   //     <Link to={`/profile/${friend.username}`}> <ListItemText primary={friend.username} /> </Link>
//   //   </ListItemButton>
//   //  </ListItem>
//   // ))}
//   //   </div>
//   // );
// };

// export default FriendList;
