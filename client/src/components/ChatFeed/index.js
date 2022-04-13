import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { useChatContext } from "../../utils/GlobalState";

const ChatFeed = ({ messages }) => {
  const [state, dispatch] = useChatContext();
  const {chat, me } = state;

  console.log("messages from global state AT FEED", messages);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            <Tooltip label={m.username} placement="bottom-end" hasArrow>
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.username}
                src="https://i.pravatar.cc/300"
                // style={{marginLeft: `${m.sender._id === me._id ? 4 : 'auto'}`}}
              />
            </Tooltip>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === me._id ? "#BFD3C1" : "#EFC7C2"
                }`,
                marginLeft: `${m.sender._id === me._id ? 40 : 'auto'}`, // if from user marginleft 0 : 33
                marginTop: `${m.sender._id === me._id ? 10 : 3}`,
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
