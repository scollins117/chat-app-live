import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { QUERY_USER } from "../../utils/queries";
import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import ProfileModal from "../Profile";
import { useChatContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_FRIEND } from "../../utils/actions";

const Chat = () => {
  const [state, dispatch] = useChatContext();
  const { currentFriend } = state;

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: currentFriend.username },
  });

  if (!loading && data != null) {
    
    const {user} = data
    console.log("CURRENT FRIEND USER DATA: ", user.messages);
  }

  const handleClick = () => {
    dispatch({
      type: UPDATE_CURRENT_FRIEND,
      currentFriend: "",
    });
    console.log("current friend: ", currentFriend);
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
            fontFamily="Work sans"
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
              // onKeyDown={sendMessage}
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
                // value={newMessage}
                // onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default Chat;
