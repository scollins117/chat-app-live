import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import ProfileModal from "../Profile";
import { QUERY_USER } from "../../utils/queries";
import { useChatContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_FRIEND } from "../../utils/actions";
import { ADD_MESSAGE } from "../../utils/mutations";
import io from "socket.io-client"; // SOCKET IO

const socketUrl = "http://localhost:3001"; // SOCKET IO CONNECT
const initSocket = () => {
  const socket = io(socketUrl, { transports: ["websocket"] });

  socket.on("connect", () => {
    console.log("SOCKET IO CONNECTED");
  });
};

initSocket();

const Chat = () => {
  const toast = useToast();
  const [state, dispatch] = useChatContext();
  const { currentFriend, currentChat } = state;
  const [formState, setFormState] = useState();
  const [addMessage] = useMutation(ADD_MESSAGE);

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: currentFriend.username },
  });

  if (!loading && data != null) {
    const { user } = data;
    console.log("CURRENT FRIEND USER DATA: ", user.messages);
  }

  const handleClick = () => {
    dispatch({
      type: UPDATE_CURRENT_FRIEND,
      currentFriend: "",
    });
    console.log("current friend: ", currentFriend);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const messageHandler = async (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      console.log("current chat to post message to: ", currentChat);
      const message = formState.messageInput;
      console.log("message to send: ", message);

      // get chat info
      // add message to current chat

      event.preventDefault();

      try {
        const { data } = await addMessage({
          variables: { messageText: message, chatId: currentChat },
        });
        console.log("addMessage data: ", data)
      } catch (e) {
        console.error(e);
        toast({
          title: "Error Occured!",
          description: e,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  return (
    <>
      {currentFriend ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Varela Round"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={handleClick}
            />
            <>
              {currentFriend.username}
              <ProfileModal
                username={currentFriend.username}
                email={currentFriend.email}
              />
            </>
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            <div className="messages">
              {/* <ScrollableChat messages={messages} /> */}
            </div>
            <FormControl
              onKeyDown={messageHandler}
              id="first-name"
              isRequired
              mt={3}
            >
              {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                name="messageInput"
                onChange={handleChange}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Varela Round">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default Chat;
