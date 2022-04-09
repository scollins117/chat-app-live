import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { QUERY_ME, QUERY_SEARCH } from "../../utils/queries";

import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";

// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";

// import ChatLoading from "../ChatLoading";
// import ProfileModal from "./ProfileModal";
// import { getSender } from "../../config/ChatLogics";
// import UserListItem from "../userAvatar/UserListItem";
// import { ChatState } from "../../Context/ChatProvider";

function Header() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedIn = Auth.loggedIn();
  const logout = (event) => {
    Auth.logout();
  };

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const { data: userData } = useQuery(QUERY_ME);


  // const searchUsers = () => {
  //   const { loading, data } = useQuery(QUERY_SEARCH);
  //   return  { data }
  // }

  const logoutHandler = () => {
    logout();
  };

  const handleSearch = async () => {
    console.log("create search code")
    // if (!search) {
    //   toast({
    //     title: "Please Enter something in search",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-left",
    //   });
    //   return;
    // }

    // try {
    //   console.log("keyword", keyword);
    //   await searchUsers({
    //     variables: keyword,
    //   });
    //   setSearchResult(data);
    // } catch (e) {
    //   console.error(e);
    //   toast({
    //     title: "Error Occured!",
    //     description: "Failed to Load the Search Results",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom-left",
    //   });
    // }
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chitty Chat
        </Text>
        <div>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name=""
                src=""
              />
            </MenuButton>
            <MenuList>
              {/* <ProfileModal userData={userData}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal> */}
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {/* {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />} */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Auth from "../../utils/auth";

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";

// const pages = ["Dashboard", "Chats"];
// const settings = ["Profile", "Account", "Logout"];

// const Header = () => {

//   const loggedIn = Auth.loggedIn();
//   const logout = event => {
//     Auth.logout();
//   };

//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = (event) => {
//     if (event.target.innerText === "CHATS") {
//       if (loggedIn) {
//         window.location.assign('/chats');
//       } else {
//         window.location.assign('/login')
//       }
//     }
//     if (event.target.innerText === "DASHBOARD") {
//       if (loggedIn) {
//         window.location.assign('/dashboard');
//       } else {
//         window.location.assign('/login')
//       }
//     }
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = (event) => {
//     if (event.target.innerHTML === "Logout") {
//       logout();
//     }
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
//           >
//             Live Chat
//           </Typography>

//           <Box sx={{ flexGrow: 1, flexWrap: "nowrap", display: "flex" }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "white", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           {Auth.loggedIn() ? (
//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: "45px" }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 {settings.map((setting) => (
//                   <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                     <Typography textAlign="center">{setting}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           ) : (
//             <Typography
//               variant="h6"
//               noWrap
//               component="div"
//               sx={{ mr: 2, display: { md: "flex" } }}
//             >
//               <Link to="/login">Login</Link>
//             </Typography>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Header;
