import {
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// React icons import
import { AiOutlineSearch } from "react-icons/ai";
import { Scrollbars } from "replace-custom-scrollbars";
import { BiArrowBack } from "react-icons/bi";

// Local imports
import { FriendRequestCard } from "./Card";
import {
  acceptFriendRequest,
  declineFriendRequest,
  getuserProfile,
} from "../actions/userActions";
import { postCreateChat } from "../actions/communicateActions";
import {
  USER_ACCEPT_FRIEND_REQUEST_RESET,
  USER_DECLINE_FRIEND_REQUEST_RESET,
} from "../constants/userConstants";
import noFriendRequestImage from "../assets/nofrinendrequest.png";

const FriendRequestBar = ({ friendRequests, setReq, profile }) => {
  const dispatch = useDispatch();

  const [firstId, setFirstId] = useState();

  const userFriend = useSelector((state) => state.userFriend);
  const { acceptFriend, error, declineFriend } = userFriend;

  useEffect(() => {
    if (acceptFriend || declineFriend) {
      dispatch(getuserProfile());
      dispatch({ type: USER_ACCEPT_FRIEND_REQUEST_RESET });
      dispatch({ type: USER_DECLINE_FRIEND_REQUEST_RESET });
    }

    if (profile) {
      setFirstId(profile._id);
    }
  }, [acceptFriend, declineFriend, profile, dispatch]);

  const acceptFriendRequestHandler = (friendEmail, secondId) => {
    dispatch(acceptFriendRequest(profile.email, friendEmail));
    dispatch(postCreateChat(firstId, secondId));
  };
  const declineFriendRequestHandler = (friendEmail) => {
    dispatch(declineFriendRequest(profile.email, friendEmail));
  };
  return (
    <>
      <Flex
        direction="column"
        bgColor="#202c33"
        minW="450px"
        maxH="670px"
        zIndex="1"
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
            width="215px"
            my="10px"
            mx="10px"
          >
            <Button
              bg="none"
              _hover={{ bg: "none" }}
              onClick={() => {
                setReq();
              }}
            >
              <Icon as={BiArrowBack} color="#d9dedd" boxSize="25px" />
            </Button>
            <Heading color="#d9dedd" fontSize="20px" fontWeight="600">
              Friend Requests
            </Heading>
          </Flex>
        </Flex>

        {/* Search Bar */}
        <Flex height="50px" maxW="450px" bgColor="#111b21" alignItems="center">
          <Flex alignItems="center" mx="7px" my="5px">
            <InputGroup>
              <InputLeftElement>
                <Icon
                  as={AiOutlineSearch}
                  color="#aebac1"
                  boxSize={4}
                  position="relative"
                  bottom="2px"
                  left="8px"
                />
              </InputLeftElement>

              <Input
                bgColor="#202c33"
                border="none"
                width="425px"
                height="35px"
                mx="6px"
                pl="50px"
                color="white"
                placeholder="Search Email"
                _placeholder={{ fontSize: "13px" }}
                focusBorderColor="#2a3942"
              />
            </InputGroup>
          </Flex>
        </Flex>

        {/* Friend Request List */}
        <Flex
          bgColor="#111b21"
          height="565px"
          width="450px"
          justifyContent="center"
          alignItems="center"
        >
          <Scrollbars>
            <Flex bgColor="#111b21" direction="column">
              {Object.values(friendRequests ? friendRequests : {}).map(
                (friendData) => {
                  return (
                    <FriendRequestCard
                      data={friendData}
                      acceptFriendRequestHandler={acceptFriendRequestHandler}
                      declineFriendRequestHandler={declineFriendRequestHandler}
                    />
                  );
                }
              )}
            </Flex>
            {!friendRequests[0] ? (
              <Flex
                alignItems="center"
                bgColor="#111b21"
                height="565px"
                width="450px"
                direction="column"
              >
                <Image
                  src={noFriendRequestImage}
                  boxSize="300px"
                  objectFit="contain"
                  mt="20px"
                />
                <Flex direction="column" alignItems="center" mt="5px">
                  <Heading fontSize="30px" color="#73f38f">
                    No friend requests yet
                  </Heading>
                  <Heading
                    fontSize="15px"
                    fontWeight="200"
                    color="white"
                    textAlign="center"
                    mx="40px"
                    mt="10px"
                  >
                    Open your world to new friendships and endless
                    possibilities. Connect, share, and learn from diverse souls
                    who color your life with experiences. Embrace the art of
                    friendship and enrich your journey!
                  </Heading>
                  <Button
                    mt="20px"
                    borderRadius="20px"
                    bgColor="#73f38f"
                    _hover={{ bgColor: "#00a884" }}
                    onClick={() => {}}
                  >
                    Make Friends
                  </Button>
                </Flex>
              </Flex>
            ) : null}
          </Scrollbars>
        </Flex>
      </Flex>
    </>
  );
};

export default FriendRequestBar;
