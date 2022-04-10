import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { QUERY_ME_BASIC, QUERY_SEARCH } from "../../utils/queries";
import ProfileModal from "../Profile";

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

function Header({ username, email }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedIn = Auth.loggedIn();
  const logout = (event) => {
    Auth.logout();
  };

  const [search, setSearch] = useState();
  const [searchItem, setSearchItem] = useState("Matthew");
  const [searchResult, setSearchResult] = useState([]);

  console.log("before query: ", searchItem);
  const { loading, data } = useQuery(QUERY_SEARCH, {
    variables: { username: searchItem },
  });

  if (!loading) {
    console.log("data: ", data);
  }

  const logoutHandler = () => {
    logout();
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    console.log("Value:", value);
    console.log("search before:", search);
    setSearch(value);
  };

  const handleSearch = async () => {
    console.log(search);
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
      console.log("Searched item: ", searchItem);
    }
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
              <Avatar size="sm" cursor="pointer" name="" src="" />
            </MenuButton>
            <MenuList>
              <ProfileModal username={username} email={email}>
                <MenuItem>My Profile</MenuItem>
                {" dasd"}
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
                placeholder="Search by name or email"
                mr={2}
                name="search"
                onChange={handleChange}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {!loading && data && searchResult?.map((user) => (
              <Box
                key={user._id}
                // onClick={() => accessChat(user._id)}
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
                  name={user.name}
                  src={user.pic}
                />
                <Box>
                  <Text>{user.name}</Text>
                  <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                  </Text>
                </Box>
              </Box>
            ))}

            {/* loadingChat && <Spinner ml="auto" d="flex" />} */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
