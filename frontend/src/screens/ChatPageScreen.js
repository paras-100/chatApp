import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MainScreen from "../components/mainComponents/MainElement";
import Sidebar from "../components/mainComponents/Sidebar";
import { getuserProfile } from "../actions/userActions";
import socket from "../socketFrontend";
import { SET_SOCKET } from "../constants/socketConstants";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loginUserInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  useEffect(() => {
    if (!loginUserInfo) {
      navigate("/");
    } else {
      dispatch(getuserProfile());
    }

    socket.connect();

    socket.emit("addNewUser", loginUserInfo ? loginUserInfo._id : null);

    return () => socket.disconnect();
  }, [loginUserInfo]);

  return (
    <Flex
      bgColor="#0c1317"
      as="main"
      minH="100vh"
      pos="relative"
      alignItems="center"
      justifyContent="center"
    >
      <Flex bgColor="white" width="1500px" height="670px">
        <Sidebar friends={profile ? profile.userFriends : null} />

        <MainScreen />
      </Flex>
    </Flex>
  );
};

export default ChatPage;
