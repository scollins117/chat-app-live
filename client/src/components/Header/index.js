import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import ProfileModal from "../Profile";
import Auth from "../../utils/auth";
import { QUERY_SEARCH } from "../../utils/queries";
import { useChatContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_FRIEND, ADD_FRIEND } from "../../utils/actions";
import { ADD_FRIEND_DB } from "../../utils/mutations";

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
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useToast } from "@chakra-ui/toast";

function Header({ username, email }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useChatContext();
  const [addFriend] = useMutation(ADD_FRIEND_DB);

  const logout = (event) => {
    Auth.logout();
  };

  const [search, setSearch] = useState();
  const [searchItem, setSearchItem] = useState("Matthew");

  const { loading, data } = useQuery(QUERY_SEARCH, {
    variables: { username: searchItem },
  });

  const logoutHandler = () => {
    logout();
  };

  if (!loading && data) {
    console.log("QUERY_SEARCH data: ", data)
    console.log("Searched Item ", searchItem);
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch({
      type: UPDATE_CURRENT_FRIEND,
      currentFriend: value,
    });
    setSearch(value);
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    } else {
      setSearchItem(search);
    }
  };

  const handleClick = (user) => {
    console.log("Friend clicked!", user);
    console.log("current friend: ", state.currentFriend);
    console.log("friends: ", state.friends);
    dispatch({
      type: ADD_FRIEND,
      friend: user,
    });
    // add friend to database
    const addFriendToDb = async () => {
      console.log("user id to add:", user._id);
      try {
        await addFriend({
          variables: { id: user._id },
        });
      } catch (e) {
        console.error(e);
        toast({
          title: "Error Occured!",
          description: "Failed to Add Friend",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
    addFriendToDb();
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
        <Text fontSize="2xl" fontFamily="Varela Round">
          Juhst Chat
        </Text>
        <div>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name="" src="" />
            </MenuButton>
            <MenuList>
              <ProfileModal username={username} email={email}>
                ddddddd
                <MenuItem>My Profile</MenuItem>ddddddd dddd
              </ProfileModal>
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
                placeholder="Search by username"
                mr={2}
                name="search"
                onChange={handleChange}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {!loading && data.user && (
              <Box
                key={data.user._id}
                onClick={() => handleClick(data.user)}
                cursor="pointer"
                bg="#E8E8E8"
                _hover={{
                  background: "#38B2AC",
                  color: "white",
                }}
                w="100%"
                d="flex"
                alignItems="center"
                color="black"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
              >
                <Avatar
                  mr={2}
                  size="sm"
                  cursor="pointer"
                  name={data.user.username}
                  src=""
                />
                <Box>
                  <Text>{data.user.username}</Text>
                  <Text fontSize="xs">
                    <b>Email : </b>
                    {data.user.email}
                  </Text>
                </Box>
              </Box>
            )}

            {/* loadingChat && <Spinner ml="auto" d="flex" />} */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
