import { Box, Stack, Text } from "@chakra-ui/layout";

import { useChatContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_FRIEND, UPDATE_FRIENDS } from "../../utils/actions";

const FriendList = () => {
  const [state, dispatch] = useChatContext();
  const { currentFriend } = state;
  const friends = state.friends;

  const handleClick = (user) => {
    console.log("Friend clicked!", user);
    dispatch({
      type: UPDATE_CURRENT_FRIEND,
      currentFriend: user,
    });
    console.log("current friend: ", currentFriend);

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
