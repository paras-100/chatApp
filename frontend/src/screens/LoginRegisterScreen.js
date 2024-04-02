import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Link,
  Checkbox,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  PinInput,
  PinInputField,
  HStack,
  useToast,
  Image,
  Box,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useBoolean } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

import { login, register } from "../actions/userActions";
import Message from "../components/Message";

import sendArrow from "../assets/sendArrow.png";
import boyOnPhone from "../assets/boyOnPhone.png";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import bgImage from "../assets/loginBackground.jpg";

const LoginRegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [rotateLogin, setRotateLogin] = useBoolean();
  const [rotateRegister, setRotateRegister] = useBoolean(true);

  // LOGIN USER
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [loginCheck, setLoginCheck] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loginLoading, loginError, loginUserInfo } = userLogin;

  const loginsubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword, loginCheck));
  };

  // REGISTER USER
  const [registerName, setRegisterName] = useState();
  const [registerEmail, setRegisterEmail] = useState();
  const [registerPassword, setRegisterPassword] = useState();
  const [otp, setOtp] = useState(false);
  const [num1, setNum1] = useState();

  const userRegister = useSelector((state) => state.userRegister);
  const { regLoading, regError, regUserInfo } = userRegister;

  useEffect(() => {
    if (loginUserInfo || regUserInfo) {
      navigate("/chatPage");
    } else if (otp) {
      registerSubmitHandler();
    }
  }, [loginUserInfo, navigate, loginError, regError, otp]);

  const registerSubmitHandler = () => {
    const params = { email: registerEmail, message: `Your Otp is ${otp}` };
    emailjs.send(
      "service_zznkvsi",
      "template_ufbstvs",
      params,
      "Rr7VhTvQU5HmSnmC1"
    );

    onOpen();
  };

  const otpGenerator = (e) => {
    e.preventDefault();

    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (registerEmail.match(mailFormat)) {
      toast({
        title: `OTP sent to you email`,
        status: "success",
        isClosable: true,
        duration: 5000,
      });
      let digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      setOtp(OTP);
    } else {
      toast({
        title: `Invalid Email Address`,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const verifyOtpHandler = (e) => {
    e.preventDefault();
    if (num1 === otp.toString()) {
      onClose();
      dispatch(register(registerName, registerEmail, registerPassword));
      toast({
        title: `OTP verified`,
        status: "success",
        isClosable: true,
        duration: 5000,
      });
    } else {
      toast({
        title: `Wrong OTP.Try again`,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };
  // parasteli2004@gmail.com

  // <Button onClick={onOpen}>Open Modal</Button>

  return (
    <Flex
      bgColor="#E6E6E6"
      as="main"
      minH="100vh"
      pos="relative"
      bgImage={bgImage}
    >
      {/* ARROW IMAGE */}
      <Image
        src={sendArrow}
        width="250px"
        objectFit="contain"
        pos="absolute"
        left="-50px"
        top="-30px"
      />

      <Image
        src={profile3}
        width="250px"
        objectFit="contain"
        pos="absolute"
        left="450px"
        top="300px"
      />

      <Image
        src={profile2}
        width="200px"
        objectFit="contain"
        pos="absolute"
        left="650px"
        top="100px"
        transform="rotate(20deg)"
      />

      <Image
        src={profile4}
        width="150px"
        objectFit="contain"
        pos="absolute"
        left="870px"
        top="0px"
        transform="rotate(40deg)"
      />
      <Image
        src={profile1}
        width="100px"
        objectFit="contain"
        pos="absolute"
        left="1070px"
        top="-30px"
        transform="rotate(65deg)"
      />

      {/* Lets get started */}
      <Flex
        pos="relative"
        top="200px"
        left="900px"
        width="475px"
        height="400px"
        direction="column"
        alignItems="end"
        bgColor="white"
        borderRadius="50px"
        px="10px"
        py="10px"
      >
        <Flex
          bgColor="#4d426d"
          pos="absolute"
          justifyContent="space-between"
          width="190px"
          top="40px"
          right="170px"
          px="10px"
          py="5px"
          borderRadius="10px 10px 1px 10px "
        >
          <Heading fontSize="20px" color="white">
            Let's get started
          </Heading>
        </Flex>
        <Image src={boyOnPhone} objectFit="contain" width="200px" />
        <Flex
          borderRadius="50px"
          justifyContent="space-between"
          width="250px"
          mr="190px"
        >
          <Image src={sendArrow} objectFit="contain" width="50px" />
          <Heading fontSize="50px" color="#4d426d" letterSpacing="-3px">
            We Chat
          </Heading>
        </Flex>
        <Flex mt="20px" mx="25px" alignItems="center" width="400px">
          <Heading fontSize="20px" fontWeight="500">
            Connect with each other with chatting. Enjoy safe and private
            texting.Portable chatting app.
          </Heading>
        </Flex>
      </Flex>

      {/* LOGIN SIGNUP COMPONENT */}
      <Flex pos="absolute" top="60px" left="100px" minH="85vh">
        {/* Login Card */}
        <motion.div
          animate={rotateLogin ? { rotateY: 180, translateX: "403px" } : "none"}
          transition={{ duration: "0.3" }}
        >
          <Flex
            pos="absolute"
            zIndex="1"
            bgColor="white"
            justifyContent="center"
            alignItems="center"
            borderRadius="50px"
            boxShadow="dark-lg"
            width="400px"
            height="600px"
          >
            <Heading
              as="h2"
              pos="absolute"
              left="30px"
              top="40px"
              fontSize="35px"
              fontWeight="700"
            >
              Hi,welcome back👋
            </Heading>
            <Heading
              as="h2"
              color="#B2B2B2"
              pos="absolute"
              left="30px"
              top="90px"
              fontSize="15px"
              fontWeight="600"
            >
              Hello again you have been missed
            </Heading>

            <form onSubmit={loginsubmitHandler}>
              <FormControl pos="absolute" left="30px" top="140px">
                {loginError && <Message type="error">{loginError}</Message>}

                <FormLabel
                  fontFamily="Inter variable,san-serif"
                  fontWeight="700"
                >
                  Email address
                </FormLabel>
                <Input
                  type="email"
                  width="335px"
                  height="50px"
                  borderWidth="2px"
                  borderColor="#c8c8c8"
                  borderRadius="10px"
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                  }}
                />
                <FormLabel
                  fontFamily="Inter variable,san-serif"
                  fontWeight="700"
                  mt="30px"
                >
                  Password
                </FormLabel>
                <Input
                  type="password"
                  width="335px"
                  height="50px"
                  borderWidth="2px"
                  borderColor="#c8c8c8"
                  borderRadius="10px"
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                  }}
                />

                <Flex
                  mt="20px"
                  mx="35px"
                  justifyContent="space-between"
                  pos="relative"
                  right="33px"
                >
                  <Checkbox
                    borderColor="#c8c8c8"
                    onChange={(e) => {
                      setLoginCheck(e.target.checked);
                    }}
                  >
                    <Heading as="h6" fontSize="15px">
                      Remember Me
                    </Heading>
                  </Checkbox>

                  <Link
                    as={RouterLink}
                    to="/about"
                    color="#FF5151"
                    _hover={{ textDecoration: "none", color: "red" }}
                  >
                    <Heading as="h6" fontSize="15px">
                      Forgot Password
                    </Heading>
                  </Link>
                </Flex>

                <Button
                  isLoading={loginLoading}
                  type="submit"
                  bgColor="#4D426D"
                  color="white"
                  mt="20px"
                  width="130px"
                  height="50px"
                  borderRadius="15px"
                >
                  Login
                </Button>

                <Heading as="h3" fontSize="15px" mt="10px" ml="2px">
                  Don't have an account?
                  <Button
                    onClick={() => {
                      setRotateLogin.toggle();
                      setRotateRegister.toggle();
                    }}
                    bg="none"
                    fontFamily="Inter Variable, sans-serif"
                    fontSize="17px"
                    fontWeight="600"
                    ml="-13px"
                    mt="-2px"
                    _hover={{
                      bg: "none",
                      textDecorationLine: "underline",
                      textUnderlineOffset: "5px",
                      color: "#4D426D",
                    }}
                  >
                    Sign up
                  </Button>
                </Heading>
              </FormControl>
            </form>
          </Flex>
        </motion.div>

        {/* Register Card */}
        <motion.div
          initial={{ rotateY: 180, translateX: "400px" }}
          animate={
            !rotateRegister
              ? { zIndex: 1, rotateY: 360, scale: 1.05, translateX: "-18px" }
              : "none"
          }
          transition={{ duration: "0.5" }}
        >
          <Flex
            pos="absolute"
            zIndex="0"
            bgColor="white"
            justifyContent="center"
            alignItems="center"
            borderRadius="50px"
            boxShadow="dark-lg"
            width="400px"
            height="600px"
          >
            <Heading
              as="h2"
              pos="absolute"
              left="30px"
              top="30px"
              fontSize="30px"
              fontWeight="700"
            >
              Create Account
            </Heading>
            <Heading
              as="h2"
              color="#B2B2B2"
              pos="absolute"
              left="30px"
              top="70px"
              fontSize="12px"
              fontWeight="600"
            >
              Connect with your friends today
            </Heading>
            <form onSubmit={otpGenerator}>
              <FormControl pos="absolute" left="30px" top="105px">
                {regError && <Message type="error">{regError}</Message>}

                <FormLabel
                  fontFamily="Inter variable,san-serif"
                  fontWeight="700"
                >
                  Name
                </FormLabel>
                <Input
                  width="335px"
                  height="40px"
                  borderWidth="2px"
                  borderColor="#c8c8c8"
                  borderRadius="10px"
                  onChange={(e) => {
                    setRegisterName(e.target.value);
                  }}
                />
                <FormLabel
                  fontFamily="Inter variable,san-serif"
                  fontWeight="700"
                  mt="15px"
                >
                  Email Address
                </FormLabel>
                <Input
                  type="email"
                  width="335px"
                  height="40px"
                  borderWidth="2px"
                  borderColor="#c8c8c8"
                  borderRadius="10px"
                  onChange={(e) => {
                    setRegisterEmail(e.target.value);
                  }}
                />
                <FormLabel
                  fontFamily="Inter variable,san-serif"
                  fontWeight="700"
                  mt="15px"
                >
                  Password
                </FormLabel>
                <Input
                  type="password"
                  width="335px"
                  height="40px"
                  borderWidth="2px"
                  borderColor="#c8c8c8"
                  borderRadius="10px"
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                  }}
                />

                <Flex
                  mt="20px"
                  mx="35px"
                  justifyContent="space-between"
                  pos="relative"
                  right="33px"
                >
                  <Checkbox borderColor="#c8c8c8" isRequired>
                    <Heading as="h6" fontSize="15px">
                      Agree to all Terms and Conditions
                    </Heading>
                  </Checkbox>
                </Flex>

                <Button
                  type="submit"
                  isLoading={regLoading}
                  bgColor="#4D426D"
                  color="white"
                  mt="20px"
                  width="130px"
                  height="50px"
                  borderRadius="15px"
                >
                  Sign Up
                </Button>

                <Heading as="h3" fontSize="15px" mt="10px" ml="2px">
                  Already have an account?
                  <Button
                    onClick={() => {
                      setRotateLogin.toggle();
                      setRotateRegister.toggle();
                    }}
                    bg="none"
                    fontFamily="Inter Variable, sans-serif"
                    fontSize="17px"
                    fontWeight="600"
                    ml="-13px"
                    mt="-2px"
                    _hover={{
                      bg: "none",
                      textDecorationLine: "underline",
                      textUnderlineOffset: "5px",
                      color: "#4D426D",
                    }}
                  >
                    Login
                  </Button>
                </Heading>
              </FormControl>
            </form>
          </Flex>
          <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Flex
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Heading fontSize="20px" mt={"50px"}>
                    Enter Otp sent on your Email
                  </Heading>
                  <HStack mt="30px">
                    <PinInput otp>
                      <PinInputField
                        borderColor="black"
                        onChange={(e) => {
                          setNum1(`${e.target.value}`);
                        }}
                      />
                      <PinInputField
                        borderColor="black"
                        onChange={(e) => {
                          setNum1(num1 + `${e.target.value}`);
                        }}
                      />
                      <PinInputField
                        borderColor="black"
                        onChange={(e) => {
                          setNum1(num1 + `${e.target.value}`);
                        }}
                      />
                      <PinInputField
                        borderColor="black"
                        onChange={(e) => {
                          setNum1(num1 + `${e.target.value}`);
                        }}
                      />
                      <PinInputField
                        borderColor="black"
                        onChange={(e) => {
                          setNum1(num1 + `${e.target.value}`);
                        }}
                      />
                      <PinInputField
                        borderColor="black"
                        onChange={(e) => {
                          setNum1(num1 + `${e.target.value}`);
                        }}
                      />
                    </PinInput>
                  </HStack>
                  <Flex>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={verifyOtpHandler}
                      mt="50px"
                      type="submit"
                    >
                      Verify
                    </Button>
                    <Button
                      colorScheme="Gray"
                      color="black"
                      mr={3}
                      onClick={otpGenerator}
                      mt="50px"
                      type="submit"
                    >
                      Resend OTP
                    </Button>
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </motion.div>
      </Flex>
    </Flex>
  );
};

export default LoginRegisterScreen;
