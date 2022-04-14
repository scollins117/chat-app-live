import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useMutation } from "@apollo/client";
import { useChatContext } from "../../utils/GlobalState";
import {
  UPDATE_CURRENT_FRIEND,
  UPDATE_CURRENT_CHAT,
} from "../../utils/actions";
import { ADD_OR_ACCESS_CHAT } from "../../utils/mutations";
import { CloseButton } from "@chakra-ui/react";

const FriendList = () => {
  const toast = useToast();
  const [state, dispatch] = useChatContext();
  const { currentFriend, me } = state;
  const [accessChat] = useMutation(ADD_OR_ACCESS_CHAT);
  //
  const handleClick = async (user) => {
    console.log("(((((((===========FRIEND CLICKED ===========))))))", user);
    //update current friend
    await dispatch({
      type: UPDATE_CURRENT_FRIEND,
      currentFriend: user,
    });
    // open chat
    console.log("user id to add:", user._id);
    try {
      const { data } = await accessChat({
        variables: { chatName: "test", userId: user._id },
      });
      console.log(
        "CHAT ID FROM ACCESS CHAT AFTER FRIEND CLICKED",
        data.addChat._id
      );

      if (data) {
        await dispatch({
          type: UPDATE_CURRENT_CHAT,
          currentChat: data.addChat._id,
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Error Occured!",
        description: "Failed to Access Friend",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
<<<<<<< HEAD
    <> {console.log("COMPONENT:  FRIEND_LIST")}
=======
    <>
      {console.log("COMPONENT:  FRIENDS_LIST")}
>>>>>>> heroku-debug
      <Box
        d={{ base: currentFriend ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
        className="semi-clear"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Varela Round"
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
          {me && me.friends && (
            <Stack overflowY="scroll">
              {me.friends.map((friend) => (
                <Box
                  d="flex"
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => {
                    handleClick(friend);
                  }}
                  cursor="pointer"
                  bg={currentFriend._id === friend._id ? "#619c5d" : "#E8E8E8"}
                  color={currentFriend._id === friend._id ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={friend._id}
                >
                  <Text>{friend.username}</Text>
                  <CloseButton alignSelf={"right"} />
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
    </>
  );
};

export default FriendList;
