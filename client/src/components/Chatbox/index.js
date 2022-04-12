import { Box } from "@chakra-ui/layout";
import { useChatContext } from "../../utils/GlobalState";
import Chat from "../Chat";
import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';

import { idbPromise } from "../../utils/helper"
import { UPDATE_CURRENT_CHAT } from '../../utils/actions';
import { QUERY_MESSAGES } from '../../utils/queries';

const Chatbox = () => {
  const [state, dispatch] = useChatContext();
  const { currentFriend } = state;

  const { loading, data } = useQuery(QUERY_MESSAGES);

  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      dispatch({
        type: UPDATE_CURRENT_CHAT,
        messages: data.message
      });

      // but let's also take each product and save it to IndexedDB using the helper function 
      data.messages.forEach((message) => {
        idbPromise('messages', 'put', message);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `messages` store
      idbPromise('messages', 'get').then((message) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_CURRENT_CHAT,
          messages: message
        });
      });

    }
  }, [data, loading, dispatch]);


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
      <Chat />
    </Box>
  );
};

export default Chatbox;


