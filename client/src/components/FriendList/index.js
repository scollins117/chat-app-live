import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useMutation } from "@apollo/client";
import { useChatContext } from "../../utils/GlobalState";
import {
  UPDATE_CURRENT_FRIEND,
  UPDATE_CURRENT_CHAT,
} from "../../utils/actions";
import { ADD_OR_ACCESS_CHAT } from "../../utils/mutations";

const FriendList = () => {
  const toast = useToast();
  const [state, dispatch] = useChatContext();
  const { currentFriend, friends } = state;
  const [accessChat] = useMutation(ADD_OR_ACCESS_CHAT);

  //
  const handleClick = async (user) => {
    console.log("Friend clicked!", user);
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

      await dispatch({
        type: UPDATE_CURRENT_CHAT,
        currentChat: data.addChat._id,
      });
      console.log("current chat: ", data.addChat._id);
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
    <Box
      d={{ base: currentFriend ? "none" : "flex", md: "flex" }}
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
        {friends && (
          <Stack overflowY="scroll">
            {friends.map((friend) => (
              <Box
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
