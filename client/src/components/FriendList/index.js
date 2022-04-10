import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { ChatState } from "../Context/ChatProvider";

const FriendList = ({data}) => {
  const [loggedUser, setLoggedUser] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const friends = data.me.friends
  console.log("My Friends: ", friends);


  var selectedChat = true;

  // const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Friends
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {friends && (
          <Stack overflowY="scroll">
            {friends.map((friend) => (
              <Box
                onClick={() => setSelectedUser(friend)}
                cursor="pointer"
                bg={selectedUser === friend ? "#38B2AC" : "#E8E8E8"}
                color={selectedUser === friend ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={friend._id}
              >
                <Text>
                 {friend.username}
                </Text>
                {/* {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )} */}
              </Box>
            ))}
          </Stack> 
        )}
      </Box>
    </Box>
  );
};

export default FriendList;