import {
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBoolean,
  Button,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { easeInOut, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "replace-custom-scrollbars";
import { useEffect, useState } from "react";

// React icons import
import {
  BsThreeDotsVertical,
  BsFilter,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotificationsActive, MdNotifications } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { TbReload } from "react-icons/tb";

// Local imports
import { FriendCard } from "../Card";
import {
  logout,
  circulateFriendInfo,
  getuserProfile,
} from "../../actions/userActions";
import ProfileBar from "../ProfileBar";
import AddFriendBar from "../AddFriendBar";
import FriendRequestBar from "../FriendRequestBar";
import NotificationBar from "../NotificationBar";
import { getFindChat } from "../../actions/communicateActions";
import socket from "../../socketFrontend";

const Sidebar = () => {
  const dispatch = useDispatch();

  const [info, setInfo] = useBoolean(false);
  const [add, setAdd] = useBoolean(false);
  const [req, setReq] = useBoolean(false);
  const [noti, setNoti] = useBoolean(false);
  const [notiActive, setNotiActive] = useBoolean(false);
  const [closeSearch, setCloseSearch] = useBoolean(false);

  const [firstId, setFirstId] = useState();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const [friends, setFriends] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (profile) {
      if (profile.notifications.length === 0) {
        setNotiActive.off();
      } else {
        setNotiActive.on();
      }
      setFriends(profile.userFriends);
      setFirstId(profile._id);
    }
  }, [profile]);

  const logoutHandler = () => {
    dispatch(logout());
    if (profile) {
      socket.emit("removeOnlineUser", profile._id);
      socket.disconnect();
    }
  };

  const searchFilterHandler = (e) => {
    const search = e.target.value.toLowerCase();
    setSearch(e.target.value);

    const filteredNames = profile.userFriends.filter((friend) => {
      return friend.name.toLowerCase().includes(search);
    });

    if (e.target.value) {
      setCloseSearch.on();
    } else {
      setCloseSearch.off();
    }

    setFriends(filteredNames);
  };

  const findChatHandler = (secondId) => {
    dispatch(getFindChat(firstId, secondId));
  };

  const circulateFriendInfoHandler = (info) => {
    dispatch(circulateFriendInfo(info));
  };

  return (
    <>
      <Flex overflow="hidden" direction="row-reverse">
        {/* Initial Sidebar */}
        <Flex
          direction="column"
          bgColor="#202c33"
          minW="450px"
          maxH="670px"
          zIndex="1"
        >
          {/* Header */}
          <Flex
            minH="60px"
            maxW="500px"
            bgColor="#202c33"
            alignItems="center"
            justifyContent="space-between"
            mx="20px"
          >
            <Image
              src={profile ? profile.profilePic : null}
              boxSize="40px"
              objectFit="cover"
              borderRadius="100px"
            />
            <Flex justifyContent="space-between" width="200px">
              <Button
                color="#aebac1"
                bgColor="#202c33"
                borderRadius="20px"
                paddingLeft="20px"
                width="40px"
                height="40px"
                _hover={{ bg: "none" }}
                _active={{ bgColor: "#374248" }}
                onClick={() => {
                  dispatch(getuserProfile());
                }}
              >
                <Icon
                  as={TbReload}
                  color="#aebac1"
                  boxSize={5}
                  my="10px"
                  mx="12px"
                  mr="10px"
                />
              </Button>

              <Button
                color="#aebac1"
                bgColor="#202c33"
                borderRadius="20px"
                paddingLeft="17px"
                width="40px"
                height="40px"
                _hover={{ bg: "none" }}
                _active={{ bgColor: "#374248" }}
                onClick={() => {
                  setNoti.on();
                }}
              >
                {profile ? (
                  notiActive ? (
                    <Icon
                      as={MdNotificationsActive}
                      color="#1BCB85"
                      boxSize={5}
                      my="10px"
                      mx="10px"
                    />
                  ) : (
                    <Icon
                      as={MdNotifications}
                      color="#aebac1"
                      boxSize={5}
                      my="10px"
                      mx="10px"
                    />
                  )
                ) : null}
              </Button>

              <Button
                color="#aebac1"
                bgColor="#202c33"
                borderRadius="20px"
                paddingLeft="20px"
                width="40px"
                height="40px"
                _hover={{ bg: "none" }}
                _active={{ bgColor: "#374248" }}
                onClick={() => {
                  setAdd.on();
                }}
              >
                <Icon
                  as={BsFillPersonPlusFill}
                  color="#aebac1"
                  boxSize={5}
                  my="10px"
                  mx="12px"
                  mr="10px"
                />
              </Button>

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
                  <Icon as={BsThreeDotsVertical} color="#aebac1" boxSize={5} />
                </MenuButton>
                <MenuList
                  bgColor="#233138"
                  border="none"
                  pos="relative"
                  right="200px"
                >
                  <MenuItem
                    as={Button}
                    bgColor="#233138"
                    _hover={{ bgColor: "#141D22" }}
                    height="40px"
                    onClick={() => {
                      setInfo.on();
                    }}
                  >
                    <Heading
                      color="#bcc2c7"
                      fontSize="14px"
                      fontWeight="500"
                      ml="-95px"
                    >
                      Profile Info
                    </Heading>
                  </MenuItem>
                  <MenuItem
                    as={Button}
                    bgColor="#233138"
                    _hover={{ bgColor: "#141D22" }}
                    height="40px"
                    onClick={() => {
                      setReq.on();
                    }}
                  >
                    <Heading
                      color="#bcc2c7"
                      fontSize="14px"
                      fontWeight="500"
                      ml="-60px"
                    >
                      Friend Requests
                    </Heading>
                  </MenuItem>
                  <MenuItem
                    as={Button}
                    bgColor="#233138"
                    _hover={{ bgColor: "#141D22" }}
                    height="40px"
                    onClick={logoutHandler}
                  >
                    <Heading
                      color="#FF3131"
                      fontSize="14px"
                      fontWeight="500"
                      ml="-120px"
                    >
                      Logout
                    </Heading>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {/* Search Bar */}
          <Flex
            height="50px"
            maxW="450px"
            bgColor="#111b21"
            alignItems="center"
          >
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

                {closeSearch ? (
                  <InputRightElement>
                    <IconButton
                      as={IoIosClose}
                      color="#aebac1"
                      boxSize={7}
                      bg="none"
                      position="relative"
                      bottom="2px"
                      right="5px"
                      _hover={{ bg: "none", cursor: "pointer" }}
                      onClick={() => {
                        setSearch("");
                        setFriends(profile.userFriends);
                        setCloseSearch.off();
                      }}
                    />
                  </InputRightElement>
                ) : null}

                <Input
                  bgColor="#202c33"
                  border="none"
                  width="395px"
                  height="35px"
                  mx="6px"
                  color="white"
                  placeholder="Search or start a new chat"
                  _placeholder={{ fontSize: "13px" }}
                  focusBorderColor="#2a3942"
                  value={search}
                  onChange={searchFilterHandler}
                />
              </InputGroup>

              <Icon as={BsFilter} color="#aebac1" boxSize={5} mx="6px" />
            </Flex>
          </Flex>

          {/* Chat List #111b21 */}
          <Scrollbars>
            <Flex bgColor="#111b21" direction="column">
              {Object.values(friends ? friends : {}).map((friendData) => {
                return (
                  <FriendCard
                    data={friendData}
                    findChatHandler={findChatHandler}
                    circulateFriendInfoHandler={circulateFriendInfoHandler}
                  />
                );
              })}
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              bgColor="#111b21"
              height="565px"
              width="450px"
              direction="column"
            >
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Heading fontSize="30px" color="#42cba5">
                  Make More Friends
                </Heading>
                <Heading
                  fontSize="15px"
                  fontWeight="200"
                  color="white"
                  textAlign="center"
                  mx="40px"
                  mt="10px"
                >
                  Open your world to new friendships and endless possibilities.
                  Connect, share, and learn from diverse souls who color your
                  life with experiences. Embrace the art of friendship and
                  enrich your journey!
                </Heading>
                <Button
                  mt="20px"
                  borderRadius="20px"
                  bgColor="#42cba5"
                  _hover={{ bgColor: "#00a884" }}
                  onClick={() => {
                    setAdd.on();
                  }}
                >
                  Make Friends
                </Button>
              </Flex>
            </Flex>
          </Scrollbars>
        </Flex>

        {/* Change Profile Info SideBar */}
        <motion.div
          animate={info ? { x: 450, zIndex: 2 } : { x: 0, zIndex: 2 }}
          transition={
            info
              ? { delay: 0.4, duration: 0.5, type: easeInOut }
              : { delay: 0.4, duration: 0.5, type: easeInOut }
          }
        >
          <ProfileBar
            setInfo={() => {
              setInfo.off();
            }}
            userProfile={profile}
          />
        </motion.div>

        {/* Add friend SideBar*/}
        <motion.div
          animate={add ? { x: 900, zIndex: 2 } : { x: 0, zIndex: 2 }}
          transition={
            add
              ? { delay: 0.2, duration: 0.7, type: easeInOut }
              : { delay: 0.2, duration: 0.7, type: easeInOut }
          }
        >
          <AddFriendBar
            setAdd={() => {
              setAdd.off();
            }}
            userProfile={profile}
          />
        </motion.div>

        {/* Friend request bar */}
        <motion.div
          animate={req ? { x: 1350, zIndex: 2 } : { x: 0, zIndex: 2 }}
          transition={
            req
              ? { delay: 0.2, duration: 0.7, type: easeInOut }
              : { delay: 0.2, duration: 1.5, type: easeInOut }
          }
        >
          <FriendRequestBar
            setReq={() => {
              setReq.off();
            }}
            friendRequests={profile ? profile.friendRequests : {}}
            profile={profile}
          />
        </motion.div>

        {/* Notification Bar */}
        <motion.div
          animate={noti ? { x: 1800, zIndex: 2 } : { x: 0, zIndex: 2 }}
          transition={
            noti
              ? { delay: 0.2, duration: 0.7, type: easeInOut }
              : { delay: 0.2, duration: 2, type: easeInOut }
          }
        >
          <NotificationBar
            setNoti={() => {
              setNoti.off();
            }}
            profile={profile}
          />
        </motion.div>
      </Flex>
    </>
  );
};

export default Sidebar;
