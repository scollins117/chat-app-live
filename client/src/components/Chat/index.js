import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import ChatFeed from "../ChatFeed";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import ProfileModal from "../Profile";
import { QUERY_CHAT, QUERY_ME } from "../../utils/queries";
import { useChatContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_FRIEND } from "../../utils/actions";
import { ADD_MESSAGE } from "../../utils/mutations";
import io from "socket.io-client"; // SOCKET IO

const socketUrl = "http://localhost:3001"; // SOCKET IO CONNECT

const socket = io(socketUrl, { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("CLIENT SIDE: SOCKET IO CONNECTED");
});

const Chat = ({ user }) => {
  const toast = useToast();
  const [state, dispatch] = useChatContext();
  const { currentFriend, currentChat } = state;
  const [messages, setMessages] = useState([]);
  const [socketMessage, setSocketMessage] = useState();
  const [formState, setFormState] = useState();
  const [addMessage] = useMutation(ADD_MESSAGE);

  //   {
  //   update(cache, { data: { addMessage } }) {
  //     try {
  //       // update thought array's cache
  //       // could potentially not exist yet, so wrap in a try/catch
  //       const chat  = cache.readQuery({ query: (QUERY_CHAT, { chatId: currentChat }) });
  //       console.log("QUERY_CHAT CACHE READ: ", chat)
  //       cache.writeQuery({
  //         query: QUERY_CHAT,
  //         data: {chat: { chatMessages: [addMessage, ...chat.chatMessages] }},
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }

  //     // update me object's cache
  //     const { me } = cache.readQuery({ query: QUERY_ME });
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: { me: { ...me, friends: [...me.friends, addMessage] } },
  //     });
  //   },
  // });

  const { loading, data, refetch } = useQuery(QUERY_CHAT, {
    variables: { chatId: currentChat },
  });

  useEffect(() => {
    if (data) {
      setMessages([data.chat.chatMessages]);
      console.log("currentChat: ", currentChat);
    }
  }, [data]);

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
    // user hits enter
    if (event.key === "Enter" && event.target.value !== "") {
      refetch();
      const message = formState.messageInput; //message from updated form state
      try {
        const { data } = await addMessage({
          variables: { messageText: message, chatId: currentChat },
        });

        if (data) {
          setMessages([...messages, data.addMessage.message]);
          console.log("data from addMessage: ", data);
        }

        socket.emit("chat message", message);

        socket.on("chat message", function (msg) {
          console.log("socket.on 'chat message': ", msg);
          setSocketMessage(msg);
          console.log("socket.on 'chat message from state': ", socketMessage);
          console.log("sock io messages': ", messages);
        });

        console.log("UPDATED LIST OF MESSAGES: ", messages);
      } catch (e) {
        console.error(e);
        toast({
          title: "Error Occured!",
          description: "Could not add message!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  // import { Avatar } from "@chakra-ui/avatar";
  // import { Tooltip } from "@chakra-ui/tooltip";
  // import ScrollableFeed from "react-scrollable-feed";
  // import {
  //   isLastMessage,
  //   isSameSender,
  //   isSameSenderMargin,
  //   isSameUser,
  // } from "../config/ChatLogics";
  // import { ChatState } from "../Context/ChatProvider";

  // const ScrollableChat = ({ messages }) => {
  //   const { user } = ChatState();

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
              {/* ----------------------------------------------------------------- */}
              <ChatFeed user={user} />
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
