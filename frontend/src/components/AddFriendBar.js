import {
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Spinner,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// React icons import

import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";

// Local imports
import adminImage from "../assets/blank-image.png";
import {
  searchFriend,
  addFriendRequest,
  getuserProfile,
} from "../actions/userActions";
import {
  USER_ADD_FRIEND_REQUEST_RESET,
  USER_SEARCH_FRIEND_RESET,
} from "../constants/userConstants";
import socket from "../socketFrontend";

const AddFriendBar = ({ setAdd, userProfile }) => {
  const dispatch = useDispatch();

  const [friendEmail, setFriendEmail] = useState();
  const [errMessage, setErrMessage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pic, setPic] = useState();
  const [id, setId] = useState();

  const userFriend = useSelector((state) => state.userFriend);
  const { loading, error, searchedFriend, addFriend } = userFriend;

  useEffect(() => {
    if (addFriend) {
      dispatch(getuserProfile());
      dispatch({ type: USER_ADD_FRIEND_REQUEST_RESET });
    } else if (userProfile) {
      setName(userProfile ? userProfile.name : "");
      setEmail(userProfile ? userProfile.email : "");
      setPic(userProfile ? userProfile.profilePic : "");
      setId(userProfile ? userProfile._id : "");
    }
  }, [userProfile, addFriend]);

  const searchFriendHandler = (e) => {
    e.preventDefault();
    setFriendEmail("");

    if (friendEmail === userProfile.email) {
      setErrMessage("Cannot add yourself");
    } else {
      setErrMessage(null);
      dispatch(searchFriend(friendEmail));
    }
  };

  const addFriendRequestHandler = () => {
    dispatch(
      addFriendRequest(searchedFriend ? searchedFriend.email : null, {
        id,
        name,
        email,
        pic,
      })
    );
  };
  return (
    <>
      <Flex direction="column" bgColor="white" minW="450px" minH="670px">
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
            width="170px"
            my="10px"
            mx="10px"
          >
            <Button
              bg="none"
              _hover={{ bg: "none" }}
              onClick={() => {
                setAdd();
                dispatch({ type: USER_SEARCH_FRIEND_RESET });
              }}
            >
              <Icon as={BiArrowBack} color="#d9dedd" boxSize="25px" />
            </Button>
            <Heading color="#d9dedd" fontSize="20px" fontWeight="600">
              Add Friend
            </Heading>
          </Flex>
        </Flex>

        {/* Search */}
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
              <form onSubmit={searchFriendHandler}>
                <Flex>
                  <Input
                    bgColor="#202c33"
                    border="none"
                    width="350px"
                    height="35px"
                    mx="6px"
                    pl="50px"
                    color="white"
                    placeholder="Search Email"
                    _placeholder={{ fontSize: "13px" }}
                    focusBorderColor="#2a3942"
                    onChange={(e) => {
                      setFriendEmail(e.target.value);
                    }}
                    value={friendEmail}
                  />
                  <Button
                    type="submit"
                    height="35px"
                    width="70px"
                    borderRadius="10px"
                    bgColor="#138155"
                    color="white"
                    fontSize="15px"
                    fontWeight="400"
                    _hover={{ bgColor: "#0B5034" }}
                    _active={{ colorScheme: "#138155" }}
                  >
                    Search
                  </Button>
                </Flex>
              </form>
            </InputGroup>
          </Flex>
        </Flex>

        {/* Add Friend*/}
        <Flex
          bgColor="#111b21"
          height="565px"
          width="450px"
          justifyContent="center"
          alignItems="center"
        >
          {!loading ? (
            <Flex width="420px" height="540px" direction="column">
              <Flex justifyContent="center" width="420px" mb="28px">
                <Image
                  src={searchedFriend ? searchedFriend.profilePic : adminImage}
                  objectFit="cover"
                  boxSize="200px"
                  borderRadius="100px"
                />
              </Flex>

              <Flex
                direction="column"
                height="88px"
                width="380px"
                mx="20px"
                mt="20px"
              >
                {errMessage ? (
                  <Heading
                    color="red"
                    mb="10px"
                    fontSize="15px"
                    fontWeight="300"
                    ml="15px"
                  >
                    {errMessage}
                  </Heading>
                ) : error ? (
                  <Heading
                    color="red"
                    mb="10px"
                    fontSize="15px"
                    fontWeight="300"
                    ml="15px"
                  >
                    {error}
                  </Heading>
                ) : null}

                <Heading
                  color="#19A161"
                  fontSize="15px"
                  fontWeight="300"
                  ml="15px"
                >
                  Friend's name
                </Heading>
                <Flex alignItems="center">
                  <Input
                    isReadOnly={true}
                    placeholder="Search for a friend first"
                    pt="20px"
                    border="none"
                    color="white"
                    _focusVisible="none"
                    value={searchedFriend ? searchedFriend.name : ""}
                  />
                </Flex>
              </Flex>

              <Flex
                direction="column"
                height="140px"
                width="380px"
                mx="20px"
                mt="10px"
              >
                <Heading
                  color="#19A161"
                  fontSize="15px"
                  fontWeight="300"
                  ml="15px"
                >
                  Friend's Email
                </Heading>
                <Flex alignItems="center">
                  <Input
                    isReadOnly={true}
                    placeholder="Search for a friend first"
                    pt="20px"
                    border="none"
                    color="white"
                    _focusVisible="none"
                    value={searchedFriend ? searchedFriend.email : ""}
                  />
                </Flex>
                <Button
                  mt="25px"
                  ml="15px"
                  fontSize="19px"
                  bgColor="#138155"
                  color="white"
                  _hover={{ bgColor: "#0B5034" }}
                  _active={{ colorScheme: "#138155" }}
                  rightIcon={<BsPersonFillAdd />}
                  onClick={addFriendRequestHandler}
                >
                  Add friend
                </Button>
              </Flex>
            </Flex>
          ) : null}

          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#138155"
              size="xl"
            />
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default AddFriendBar;
