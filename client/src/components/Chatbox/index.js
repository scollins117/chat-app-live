import { Box } from "@chakra-ui/layout";
import { useChatContext } from "../../utils/GlobalState";
import Chat from"../Chat";

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
      <Chat/>
    </Box>
  );
};

export default Chatbox;
