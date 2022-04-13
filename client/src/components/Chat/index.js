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
import { QUERY_CHAT } from "../../utils/queries";
import { useChatContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_FRIEND, UPDATE_CHAT } from "../../utils/actions";
import { ADD_MESSAGE } from "../../utils/mutations";
import io from "socket.io-client"; // SOCKET IO

const socketUrl = "https://agile-anchorage-60356.herokuapp.com"; // SOCKET IO CONNECT DEPLOYED: https://agile-anchorage-60356.herokuapp.com/ LOCAL ::http://localhost:3001
let socket;

const Chat = () => {
  const toast = useToast();
  const [state, dispatch] = useChatContext();
  const { currentFriend, currentChat, me } = state;
  const [messages, setMessages] = useState([]);
  const [addMessage] = useMutation(ADD_MESSAGE);

  // console.log("CHAT MESSAGES ON CHAT LOAD: ", messages);
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
    variables: { chatId: currentChat, enabled: !!currentChat },
    // The query will not execute until the userId exists
  });

  useEffect(() => {
    if (data && data.chat) {
      console.log("useEffect Chat Data ", data.chat);
      dispatch({
        type: UPDATE_CHAT,
        chat: data.chat,
      });
      // socket.emit("join chat", currentChat);
      setMessages(data.chat.chatMessages);
      console.log("USEEFFECT MESSAGES STATE: ", messages);

      const username = me.username;
      const roomname = currentChat;
      const id = me._id;
      console.log(
        "user name and chat id for socket JoinRoom: ",
        username,
        roomname
      );

      socket.emit("joinRoom", currentChat);
      console.log("======CLIENT JOINED CHAT: ", currentChat);
    }
  }, [data, dispatch]);

  useEffect(() => {
    socket = io(socketUrl, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("CLIENT SIDE: SOCKET IO CONNECTED");
    });
    socket.emit("setup", me);
  });

  const handleClick = () => {
    dispatch({
      type: UPDATE_CURRENT_FRIEND,
      currentFriend: "",
    });
    console.log("current friend: ", currentFriend);
  };

  const messageHandler = async (event) => {
    // user hits enter
    if (event.key === "Enter" && event.target.value !== "") {
      console.log("(((((============USER HIT ENTER==========)))))");
      const message = event.target.value; //message from updated form state
      event.target.value = ""
      console.log("MESSAGE going to addMessage: ", message);
      console.log("CHAT ID going to addMessage: ", currentChat);

      try {
        const { data } = await addMessage({
          variables: { messageText: message, chatId: currentChat },
        });

        if (!loading && data) {
          console.log("data from addMessage: ", data);
          console.log("CURRENT MESSAGE STATE DATA:", messages);
          const newMessage = data.addMessage;
          setMessages([...messages, newMessage]);
          const chatId = currentChat;
          refetch();
          socket.emit("chat", { newMessage, chatId });
        }

        // update state with new data
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

  useEffect(() => {
    socket.on("message", (data) => {
      if (messages.length < 1) {
        refetch();
      } else {
        console.log("CHAT MESSAGES ON CHAT LOAD: ", messages);
        let temp = data.data;
        console.log("ON RECEIVER MESSAGES STATE: ", messages);
        console.log("***************PUSHED TO MESSAGE STATE: ", temp);
        setMessages([temp]);
        return () => {
          // This is the cleanup function
        };
      }
    });
  }, [socket]);

  return (
    <> {console.log("COMPONENT:  ___CHAT___")}
      {currentFriend && messages ? (
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

              <ProfileModal chatFriend={currentFriend}/>
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
              <ChatFeed messages={messages} />
            </div>
            <FormControl
              onKeyDown={messageHandler}
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                name="messageInput"
                // onChange={handleChange}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Varela Round">
            Add a friend and Juhst Chat!
          </Text>
        </Box>
      )}
    </>
  );
};

export default Chat;
