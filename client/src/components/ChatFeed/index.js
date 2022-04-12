import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { useChatContext } from "../../utils/GlobalState";
import { QUERY_CHAT } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const ChatFeed = ({ user }) => {
  const [state, dispatch] = useChatContext();
  const { currentFriend, currentChat } = state;

  const { loading, data, refetch } = useQuery(QUERY_CHAT, {
    variables: { chatId: currentChat },
  });

  useEffect(() => {
    if (data) {
      const messages = data.chat.chatMessages;
      console.log("CHAT MESSAGES AT FEED", messages);

      console.log("CURRENT FRIEND AT FEED", currentFriend);
      console.log("CURRENT USER AT FEED", user);
    }
  }, [data, currentFriend]);

  const dataExposeFunction = (m) => {

    if (m.sender._id === user) {
      console.log(" from user")
      return 33
    } else {
      console.log(" from friend")
      return "auto"
    }
  }

  return (
    <ScrollableFeed>
      {data &&
        data.chat.chatMessages &&
        data.chat.chatMessages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            <Tooltip
              label={m.sender.username}
              placement="bottom-end"
              hasArrow
            >
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.username}
                src=""
              />
            </Tooltip>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user ? "#BFD3C1" : "#EFC7C2"
                }`,
                marginLeft: `${dataExposeFunction(m)}`, // if from user marginleft 0 : 33
                marginTop: `${m.sender._id === user ? 10 : 3}`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.messageText}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ChatFeed;
