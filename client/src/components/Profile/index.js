import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { useChatContext } from "../../utils/GlobalState";

const ProfileModal = ({ chatFriend }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useChatContext();
  const { me } = state;

  if (me) {
    return (
      <>
        {" "}
        {console.log("COMPONENT:  PROFILE")}
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
        {chatFriend ? (
          <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h="410px">
              <ModalHeader
                fontSize="40px"
                fontFamily="Varela Round"
                d="flex"
                justifyContent="center"
              >
                {chatFriend.username}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
                d="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src="https://picsum.photos/200/300?random=1"
                  alt="random pic"
                />
                <Text
                  fontSize={{ base: "28px", md: "30px" }}
                  fontFamily="Varela Round"
                >
                  Email: {chatFriend.email}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h="410px">
              <ModalHeader
                fontSize="40px"
                fontFamily="Varela Round"
                d="flex"
                justifyContent="center"
              >
                {me.username}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
                d="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src="https://picsum.photos/200/300?random=1"
                  alt="random pic"
                />
                <Text
                  fontSize={{ base: "28px", md: "30px" }}
                  fontFamily="Varela Round"
                >
                  Email: {me.email}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }
};

export default ProfileModal;
