import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";

import { useChatContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_FRIEND } from "../../utils/actions";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import { ChatState } from "../Context/ChatProvider";

const FriendList = ({ data }) => {
  const friends = data.me.friends;
  const [state, dispatch] = useChatContext();
  const { currentFriend } = state;

  // useEffect(() => {
  //   // if categoryData exists or has changed from the response of useQuery, then run dispatch()
  //   if (friends) {
  //     // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
  //     dispatch({
  //       type: UPDATE_CURRENT_FRIEND,
  //       currentFriend: friends.currentFriend,
  //     });
  //   }
  // }, [currentFriend, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_FRIEND,
      currentFriend: id,
    });
  };

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
                onClick={() => {
                  handleClick(friend._id);
                }}
                cursor="pointer"
                bg={currentFriend === friend._id ? "#38B2AC" : "#E8E8E8"}
                color={currentFriend === friend._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={friend._id}
              >
                <Text>{friend.username}</Text>
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
