import { Box } from "@chakra-ui/layout";
import { useChatContext } from "../../utils/GlobalState";

const Chatbox = () => {
  const [state, dispatch] = useChatContext();
  const { currentFriend } = state;

  return (
    <Box
      display={{ base: currentFriend ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {/* <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */}
    </Box>
  );
};

export default Chatbox;

// import React from "react";

// import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// import TextField from "@mui/material/TextField";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Fab from "@mui/material/Fab";

// const Chatbox = () => {
//   return (
//     <Grid item xs={9}>
//       <List sx={{ height: "70vh", overflowY: "auto" }}>
//         <ListItem key="1">
//           <Grid container>
//             <Grid item xs={12}>
//               <ListItemText
//                 align="right"
//                 primary="Hey man, What's up ?"
//               ></ListItemText>
//             </Grid>
//             <Grid item xs={12}>
//               <ListItemText align="right" secondary="09:30"></ListItemText>
//             </Grid>
//           </Grid>
//         </ListItem>
//         <ListItem key="2">
//           <Grid container>
//             <Grid item xs={12}>
//               <ListItemText
//                 align="left"
//                 primary="Hey, Iam Good! What about you ?"
//               ></ListItemText>
//             </Grid>
//             <Grid item xs={12}>
//               <ListItemText align="left" secondary="09:31"></ListItemText>
//             </Grid>
//           </Grid>
//         </ListItem>
//         <ListItem key="3">
//           <Grid container>
//             <Grid item xs={12}>
//               <ListItemText
//                 align="right"
//                 primary="Cool. i am good, let's catch up!"
//               ></ListItemText>
//             </Grid>
//             <Grid item xs={12}>
//               <ListItemText align="right" secondary="10:30"></ListItemText>
//             </Grid>
//           </Grid>
//         </ListItem>
//       </List>
//       <Divider />
//       <Grid container style={{ padding: "20px" }}>
//         <Grid item xs={11}>
//           <TextField
//             id="outlined-basic-email"
//             label="Type Something"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={1} align="right">
//           <Fab color="primary" aria-label="add">
//             {/* <SendIcon /> */}
//           </Fab>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default Chatbox;
