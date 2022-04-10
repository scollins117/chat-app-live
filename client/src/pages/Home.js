import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

import { useChatContext } from '../utils/GlobalState';
import { TOGGLE_SHOW } from '../utils/actions';

function Home() {

  const [state, dispatch] = useChatContext();
  
  const {showOpen} = state

  function toggleShow() {
    if (showOpen === true)  {
    dispatch({ type: TOGGLE_SHOW });
  }
  }

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Chitty Chat
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab onClick={toggleShow}>Login</Tab>
            <Tab onClick={toggleShow}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel >
              <Login />
            </TabPanel>
            <TabPanel >
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;