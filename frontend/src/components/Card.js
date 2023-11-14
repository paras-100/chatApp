import {
  Flex,
  Heading,
  Image,
  IconButton,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";

// React Icons

import { BsCheck2 } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

// Local Imports
import ProfilePhoto from "../assets/profile 4.png";

const FriendCard = ({ data, findChatHandler, circulateFriendInfoHandler }) => {
  const findChat = () => {
    findChatHandler(data.id);
  };

  const friendInfoHandler = () => {
    circulateFriendInfoHandler(data);
  };

  return (
    <>
      <Button
        minW="444px"
        height="73px"
        bgColor="#111b21"
        _hover={{ bgColor: "#202C33" }}
        borderRadius="none"
        onClick={() => {
          findChat();
          friendInfoHandler();
        }}
      >
        <Flex minW="444px" height="73px" alignItems="center">
          <Flex>
            <Image
              src={data.pic || ProfilePhoto}
              boxSize="50px"
              borderRadius="100px"
              objectFit="cover"
              mx="15px"
            />
          </Flex>
          <Flex
            minW="350px"
            minH="73px"
            justifyContent="center"
            alignItems="center"
            borderBottom="1px"
            borderBottomColor="#2A3A44"
            direction="column"
          >
            <Flex minW="350px" justifyContent="start">
              <Heading color="white" fontSize="15px" fontWeight="500">
                {data.name}
              </Heading>
              <Heading color="#7c776e" fontSize="10px">
                {data.date}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Button>
    </>
  );
};

const FriendRequestCard = ({
  data,
  acceptFriendRequestHandler,
  declineFriendRequestHandler,
}) => {
  const acceptHandler = () => {
    acceptFriendRequestHandler(data.email, data._id);
  };
  const declineHandler = () => {
    declineFriendRequestHandler(data.email);
  };

  return (
    <>
      <Flex minW="444px" height="73px" alignItems="center">
        <Flex>
          <Image
            src={ProfilePhoto}
            boxSize="50px"
            objectFit="contain"
            mx="15px"
          />
        </Flex>
        <Flex
          maxW="350px"
          minH="73px"
          alignItems="center"
          justifyContent="center"
          borderBottom="1px"
          borderBottomColor="#2A3A44"
        >
          <Flex direction="column">
            <Heading
              color="#20C784"
              fontSize="15px"
              fontWeight="600"
              width="250px"
            >
              {data.name}
            </Heading>
            <Heading color="#7c776e" fontSize="15px" fontWeight="500">
              {data.email}
            </Heading>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" mx="10px" width="90px">
          <IconButton
            bgColor="#0FA86B"
            color="white"
            fontSize="25px"
            icon={<BsCheck2 />}
            _hover={{ bgColor: "#0D5236" }}
            onClick={acceptHandler}
          />
          <IconButton
            bgColor="#FF4A4A"
            color="white"
            fontSize="25px"
            icon={<MdOutlineCancel />}
            _hover={{ bgColor: "#A82121" }}
            onClick={declineHandler}
          />
        </Flex>
      </Flex>
    </>
  );
};

const NotificationCard = ({ notify }) => {
  return (
    <>
      <Flex minW="444px" minH="73px" alignItems="center">
        <Flex>
          <Icon
            as={FaUserFriends}
            color="#1BCB85"
            boxSize="30px"
            objectFit="contain"
            mx="15px"
          />
        </Flex>
        <Flex
          direction="column"
          width="370px"
          minH="73px"
          alignItems="center"
          justifyContent="center"
          borderBottom="1px"
          borderBottomColor="#2A3A44"
        >
          <Flex justifyContent="space-between">
            <Heading
              color="white"
              fontSize="15px"
              fontWeight="500"
              width="280px"
            >
              {notify.message}
            </Heading>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading color="#7c776e" fontSize="10px" my="5px">
                {notify.date}
              </Heading>
              <Heading color="#7c776e" fontSize="10px">
                {notify.time}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const MessageCard = ({ Chat, id, length, index }) => {
  useEffect(() => {
    if (length === index + 1) {
      document.querySelector(".messageEnd").scrollIntoView();
    }
  }, [Chat, index, length]);

  return (
    <>
      {Chat.senderId !== id ? (
        <Flex width="950px" mt="-50px">
          <Flex
            bgColor="#202c33"
            direction="column"
            maxW="540px"
            px="10px"
            py="10px"
            __css={{ borderRadius: "2px 15px 15px 15px " }}
            className={length == index + 1 ? "messageEnd" : null}
          >
            <Flex>
              <Heading
                fontSize="15px"
                fontWeight="400"
                color="white"
                lineHeight="23px"
                wordBreak="break-word"
              >
                {Chat.text}
              </Heading>
            </Flex>
            <Flex maxW="540px" justifyContent="end" ml="50px">
              <Heading color="#B1B1B1" fontSize="10px" fontWeight="400">
                {Chat.time}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      ) : null}

      {Chat.senderId === id ? (
        <Flex width="950px" mt="-50px" justifyContent="end">
          <Flex
            bgColor="#005C4B"
            direction="column"
            maxW="540px"
            px="10px"
            py="10px"
            __css={{ borderRadius: "15px 2px 15px 15px " }}
            className={length == index + 1 ? "messageEnd" : null}
          >
            <Flex>
              <Heading
                fontSize="15px"
                fontWeight="400"
                color="white"
                lineHeight="23px"
                wordBreak="break-word"
              >
                {Chat.text}
              </Heading>
            </Flex>
            <Flex maxW="540px" justifyContent="end" ml="50px">
              <Heading color="#B1B1B1" fontSize="10px" fontWeight="400">
                {Chat.time}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      ) : null}
    </>
  );
};

export { FriendCard, FriendRequestCard, NotificationCard, MessageCard };
