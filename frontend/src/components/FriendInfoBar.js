import {
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Button,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useBoolean,
} from "@chakra-ui/react";

import { BiArrowBack } from "react-icons/bi";
import { MdPersonRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { friendRemover } from "../actions/userActions";

const FriendInfoBar = ({ closeBar }) => {
  const dispatch = useDispatch();

  const [alertOpen, setAlertOpen] = useBoolean(false);

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const chatFriendInfo = useSelector((state) => state.chatFriendInfo);
  const { friendInfo } = chatFriendInfo;

  const findFriendChat = useSelector((state) => state.findFriendChat);
  const { friendChat } = findFriendChat;

  const removeFriendHandler = () => {
    closeBar.off();
    dispatch(friendRemover(profile._id, friendInfo.id, friendChat.chatId));
  };

  return (
    <Flex
      direction="column"
      width="450px"
      height="670px"
      zIndex="3"
      bgColor="#111B21"
      borderLeft="1px"
      borderColor="#616161"
    >
      {/* Header */}
      <Flex
        height="105px"
        width="450px"
        bgColor="#202c33"
        alignItems="flex-end"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="210px"
          my="10px"
          mx="10px"
        >
          <Button
            bg="none"
            _hover={{ bg: "none" }}
            onClick={() => closeBar.off()}
          >
            <Icon as={BiArrowBack} color="#d9dedd" boxSize="25px" />
          </Button>
          <Heading color="#d9dedd" fontSize="20px" fontWeight="600">
            Friend's Profile
          </Heading>
        </Flex>
      </Flex>

      {/* Friend Profile */}
      <Flex
        bgColor="#111b21"
        height="565px"
        width="450px"
        justifyContent="center"
        alignItems="center"
      >
        <Flex width="420px" height="450px" direction="column">
          <Flex
            justifyContent="center"
            alignItems="center"
            width="420px"
            mb="28px"
            direction="column"
          >
            <Image
              src={friendInfo ? friendInfo.pic : null}
              objectFit="cover"
              boxSize="200px"
              borderRadius="100px"
            />
          </Flex>

          <Flex direction="column" height="100px" width="380px" mx="20px">
            <Heading color="#19A161" fontSize="15px" fontWeight="300" ml="15px">
              Friend's name
            </Heading>
            <Flex alignItems="center">
              <Input
                isReadOnly={true}
                placeholder="Your name"
                pt="20px"
                border="none"
                color="white"
                _focusVisible="none"
                value={friendInfo ? friendInfo.name : null}
              />
            </Flex>
          </Flex>

          <Flex direction="column" height="100px" width="380px" mx="20px">
            <Heading color="#19A161" fontSize="15px" fontWeight="300" ml="15px">
              Friend's Email
            </Heading>
            <Flex alignItems="center">
              <Input
                isReadOnly={true}
                placeholder="Your name"
                pt="20px"
                border="none"
                color="white"
                _focusVisible="none"
                value={friendInfo ? friendInfo.email : null}
              />
            </Flex>
          </Flex>

          <Flex
            direction="column"
            height="40px"
            width="380px"
            mx="20px"
            justifyContent="start"
          >
            <Button
              bg="none"
              width="200px"
              color="#FF5454"
              fontSize="20px"
              fontWeight="500"
              _hover={{ bg: "none" }}
              leftIcon={<MdPersonRemove />}
              onClick={() => setAlertOpen.on()}
            >
              Remove Friend
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* Alert Modal */}
      <>
        <AlertDialog motionPreset="slideInBottom" isOpen={alertOpen} isCentered>
          <AlertDialogOverlay />

          <AlertDialogContent bgColor="#111b21">
            <AlertDialogHeader color="white">
              Do you want to remove {friendInfo?.name} from friend list?
            </AlertDialogHeader>
            <AlertDialogCloseButton color="white" />
            <AlertDialogFooter>
              <Button onClick={() => setAlertOpen.off()}>No</Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  setAlertOpen.off();
                  removeFriendHandler();
                }}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </Flex>
  );
};

export default FriendInfoBar;
