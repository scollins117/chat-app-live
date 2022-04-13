import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { useChatContext } from "../../utils/GlobalState";

const ChatFeed = ({ messages }) => {
  const [state, dispatch] = useChatContext();
  const {chat, me } = state;
  
  const colorfn = (m) => {
    if (m.sender._id === me._id) {
      // console.log(" from user");
      return true;
    } else {
      // console.log(" from friend");
      return false;
    }
  };

  const marginLeftFn = (m) => {
    if (m.sender._id === me._id) {
      // console.log(" from friend");
      return 40;
    } else {
      // console.log(" from friend");
      return "auto";
    }
  };

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
                src=""
              />
            </Tooltip>
            <span
              style={{
                backgroundColor: `${
                  colorfn(m) ? "#BFD3C1" : "#EFC7C2"
                }`,
                marginLeft: `${marginLeftFn(m)}`, // if from user marginleft 0 : 33
                marginTop: `${m._id === m.username ? 10 : 3}`,
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
