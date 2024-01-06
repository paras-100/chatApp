import {
  Flex,
  Image,
  Icon,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Spinner,
  useBoolean,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import EmojiPicker from "emoji-picker-react";

// React icons import
import {
  BsThreeDotsVertical,
  BsShieldLockFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { SiSololearn } from "react-icons/si";
import { IoMdClose } from "react-icons/io";
import "@fontsource/roboto";

// Local imports
import { MessageCard } from "../Card";
import ChatGptBar from "../ChatGptBar";
import mainimage from "../../assets/mainImage.jpg";
import mainDisplayImage from "../../assets/maindisplayimage.png";
import { postCreateMessage } from "../../actions/communicateActions";
import {
  COM_SEND_MESSAGE_RESET,
  COM_SEND_MESSAGE_SUCCESS,
  COM_FIND_CHAT_RESET,
} from "../../constants/commuincateConstants";
import "./mainElement.css";
import socket from "../../socketFrontend";

const MainElement = () => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [emojiPicker, setEmojiPicker] = useBoolean(false);

  const [text, setText] = useState();
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const findFriendChat = useSelector((state) => state.findFriendChat);
  const { loading, friendChat } = findFriendChat;

  const chatFriendInfo = useSelector((state) => state.chatFriendInfo);
  const { friendInfo } = chatFriendInfo;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const sendMessage = useSelector((state) => state.sendMessage);
  const { chatMessage } = sendMessage;

  useEffect(() => {
    if (chatMessage) {
      setChats([...chats, ...chatMessage]);
      dispatch({ type: COM_SEND_MESSAGE_RESET });
    }
  }, [chatMessage]);

  useEffect(() => {
    if (friendChat) {
      setChats([...friendChat.Chats]);
    }
  }, [friendChat]);

  useEffect(() => {
    if (friendInfo) {
      setChats([]);
    }
  }, [friendInfo]);

  useEffect(() => {
    socket.on("getMessage", (message) => {
      dispatch({ type: COM_SEND_MESSAGE_SUCCESS, payload: [message] });
    });

    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);

  const sendMessageHandler = (text) => {
    dispatch(postCreateMessage(friendChat.chatId, profile._id, text));

    socket.emit("sendMessage", {
      senderId: profile._id,
      text,
      recieverId: friendInfo.id,
    });
  };

  return (
    <>
      {/* Chat Screen */}
      {friendChat ? (
        <Flex
          direction="column"
          bgColor="#111B21"
          minW={isOpen ? "600px" : "1050px"}
          maxH="670px"
          borderLeft="1px"
          borderColor="#616161"
          position="relative"
        >
          {/* Header */}
          <Flex
            minH="60px"
            width={isOpen ? "600px" : "1050px"}
            bgColor="#202c33"
            alignItems="center"
          >
            <Flex
              justifyContent="space-between"
              width={isOpen ? "600px" : "1050px"}
              mx="20px"
              mt="5px"
            >
              <Flex justifyContent="space-between" width="170px">
                <Image
                  src={friendInfo ? friendInfo.pic : null}
                  boxSize="40px"
                  objectFit="cover"
                  borderRadius="50px"
                />
                <Flex direction="column" mt="2px">
                  <Heading
                    as="h2"
                    color="white"
                    fontSize="15px"
                    fontFamily="'Roboto', sans-serif"
                    fontWeight="500"
                  >
                    {friendInfo ? friendInfo.name : null}
                  </Heading>
                  {onlineUsers.some((user) => user.userId === friendInfo.id) ? (
                    <Flex minW="115px" mt="3px">
                      <Flex
                        bgColor="#42CBA5"
                        width="7px"
                        height="7px"
                        borderRadius="10px"
                        mt="3px"
                      />
                      <Heading color="#7c776e" fontSize="10px" ml="3px">
                        online
                      </Heading>
                    </Flex>
                  ) : (
                    <Heading
                      as="h6"
                      color="#8298A4"
                      fontSize="12px"
                      fontFamily="'Roboto', sans-serif"
                      fontWeight="500"
                      mt="4px"
                    >
                      {friendInfo ? friendInfo.email : null}
                    </Heading>
                  )}
                </Flex>
              </Flex>
              <Flex
                alignItems="center"
                minW="80px"
                justifyContent="space-between"
              >
                <Icon as={AiOutlineSearch} color="#aebac1" boxSize={6} />
                <Menu>
                  <MenuButton
                    color="#aebac1"
                    bgColor="#202c33"
                    borderRadius="20px"
                    pt="5px"
                    width="40px"
                    height="40px"
                    _hover={{ bg: "none" }}
                    _active={{ bgColor: "#374248" }}
                  >
                    <Icon
                      as={BsThreeDotsVertical}
                      color="#aebac1"
                      boxSize={5}
                    />
                  </MenuButton>
                  <MenuList
                    bgColor="#233138"
                    border="none"
                    width="230px"
                    pos="relative"
                    right={isOpen ? "180px" : null}
                  >
                    <MenuItem
                      bgColor="#233138"
                      _hover={{ bgColor: "#141D22" }}
                      height="40px"
                    >
                      <Heading
                        color="#bcc2c7"
                        fontSize="14px"
                        fontWeight="500"
                        ml="10px"
                      >
                        Friend Info
                      </Heading>
                    </MenuItem>
                    <MenuItem
                      bgColor="#233138"
                      _hover={{ bgColor: "#141D22" }}
                      height="40px"
                    >
                      <Button
                        pr="140px"
                        bg="none"
                        color="#95a1a8"
                        fontSize="14px"
                        fontWeight="500"
                        ml="5px"
                        _hover={{ bg: "none" }}
                        onClick={() => {
                          dispatch({ type: COM_FIND_CHAT_RESET });
                        }}
                      >
                        Close Chat
                      </Button>
                    </MenuItem>
                    <MenuItem
                      bgColor="#233138"
                      _hover={{ bgColor: "#141D22" }}
                      height="40px"
                    >
                      <Heading
                        color="#bcc2c7"
                        fontSize="14px"
                        fontWeight="500"
                        ml="10px"
                      >
                        Delete Chats
                      </Heading>
                    </MenuItem>
                    <MenuItem
                      bgColor="#233138"
                      _hover={{ bgColor: "#141D22" }}
                      height="40px"
                    >
                      <Heading
                        color="#FF5454"
                        fontSize="14px"
                        fontWeight="500"
                        ml="10px"
                      >
                        Block
                      </Heading>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Flex>

          {/* Main Element */}
          <Flex
            minH="545px"
            minW={isOpen ? "600px" : "1050px"}
            bgColor="#0b141a"
            bgImage={mainimage}
            bgSize="1050px"
            bgRepeat="no-repeat"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Flex width="1050px" justifyContent="center" mt="20px"></Flex>
            <Flex width="1050px" height="560px">
              <div className="messageScroll">
                <Flex
                  bgColor="#182229"
                  minWidth="5px"
                  minH="25px"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="5px"
                  mt="15px"
                  mb="30px"
                >
                  <Heading
                    fontSize="13px"
                    color="#eeb14c"
                    fontWeight="400"
                    px="10px"
                  >
                    Start your conversation with {friendInfo.name}.
                  </Heading>
                </Flex>

                {chats
                  ? chats.map((Chat, index) => {
                      return (
                        <Flex
                          justifyContent="center"
                          my="10px"
                          mb="30px"
                          mt="30px"
                        >
                          <MessageCard
                            Chat={Chat}
                            id={profile ? profile._id : null}
                            length={chats.length}
                            index={index}
                            friendId={friendInfo.id}
                            gptOpen={isOpen}
                          />
                        </Flex>
                      );
                    })
                  : null}
              </div>
            </Flex>
          </Flex>

          {/* Input */}
          <Flex
            minH="65px"
            width={isOpen ? "600px" : "1050px"}
            bgColor="#202c33"
            alignItems="center"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width={isOpen ? "650px" : "1050px"}
              mx="20px"
            >
              <Button
                width="40px"
                borderRadius="50px"
                bg="none"
                _hover={{ bgColor: "#141D22" }}
                onClick={() => {
                  setEmojiPicker.toggle();
                }}
              >
                {emojiPicker ? (
                  <Icon as={IoMdClose} color="#82929c" boxSize={7} />
                ) : (
                  <Icon as={BsEmojiSmile} color="#82929c" boxSize={6} />
                )}
              </Button>

              {emojiPicker ? (
                <Flex position="absolute" zIndex="5" bottom="65px" right="0px">
                  <EmojiPicker
                    theme="dark"
                    width="1050px"
                    height="400px"
                    onEmojiClick={(emoji) =>
                      setText((prev) => `${prev ? prev : ""}${emoji.emoji}`)
                    }
                  />
                </Flex>
              ) : null}

              <Input
                value={text}
                color="white"
                width={isOpen ? "450px" : "910px"}
                border="none"
                bgColor="#2a3942"
                placeholder="Type a message..."
                focusBorderColor="#2a3942"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessageHandler(text);
                    setText("");
                  }
                }}
              />
              <Button
                width="40px"
                borderRadius="50px"
                bg="none"
                _hover={{ bgColor: "#141D22" }}
                onClick={onOpen}
              >
                <Icon as={SiSololearn} color="#44C75D" boxSize={5} />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ) : null}

      {/* CHATGPT */}
      {isOpen && <ChatGptBar onClose={onClose} />}

      {/* Display Screen */}
      {!friendChat && !loading ? (
        <Flex
          direction="column"
          bgColor="#222e35"
          minW="1050px"
          maxH="670px"
          justifyContent="center"
          alignItems="center"
          _after={{
            content: '""',
            pos: "relative",
            width: "1050px",
            height: "6px",
            bgColor: "#42CBA5",
            bottom: "-80px",
          }}
          _before={{
            content: '""',
            pos: "relative",
            width: "1050px",
            height: "5px",
            bgColor: "#42CBA5",
            top: "-80px",
          }}
        >
          <Flex
            width="700px"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={mainDisplayImage} boxSize="300px" objectFit="contain" />
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading color="#42cba5" fontSize="30px" fontWeight="500">
                Real-Time Chat Web App
              </Heading>
              <Heading
                fontSize="15px"
                color="#788288"
                fontWeight="300"
                textAlign="center"
                mx="100px"
                mt="15px"
              >
                Send and recieve messages without keeping your phone online. Use
                this WebApp from any part of the world.Link upto end number
                devices at same time
              </Heading>
              <Flex justifyContent="space-between" width="175px" mt="75px">
                <Icon as={BsShieldLockFill} color="#788288" />
                <Heading fontSize="15px" color="#788288" fontWeight="300">
                  End-to-end encryped
                </Heading>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : null}

      {/* Loading Screen */}
      {loading ? (
        <Flex
          bgColor="#222e35"
          minW="1050px"
          maxH="670px"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : null}
    </>
  );
};

export default MainElement;
