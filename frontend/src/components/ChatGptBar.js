import {
  Flex,
  Icon,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";

import { AIChat } from "./Card";
import { IoMdExit, IoMdSend } from "react-icons/io";

const ChatGptBar = ({ onClose }) => {
  const [prompt, setPrompt] = useState();
  const [userMessage, setUserMessage] = useState();
  const [responseText, setResponseText] = useState("");
  const [load, setLoad] = useBoolean(false);

  console.log(process.env.REACT_APP_CHAT_GPT);

  const handlePrompt = async (e) => {
    if (!prompt || prompt === "") return;

    try {
      setLoad.on();
      setUserMessage(prompt);

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_CHAT_GPT}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 1.0,
            top_p: 0.7,
            n: 1,
            stream: false,
            presence_penalty: 0,
            frequency_penalty: 0,
          }),
        }
      );

      setPrompt("");
      setUserMessage(null);
      console.log(1);

      if (response.ok) {
        const data = await response.json();
        setResponseText(data.choices[0].message);
      } else {
        setResponseText("Error: Unable to process your request.");
      }
      setLoad.off();
      console.log(2);
    } catch (error) {
      console.error(error);
      setResponseText("Error: Unable to process your request.");
      setLoad.off();
    }

    setTimeout(() => {
      setResponseText(null);
    }, [500]);
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
      <Flex minH="60px" width="450px" bgColor="#202c33" alignItems="center">
        <Flex mx="20px" alignItems="center">
          <Button
            width="40px"
            borderRadius="50px"
            bgColor="#2a3942"
            _hover={{ bgColor: "#141D22" }}
            onClick={onClose}
          >
            <Icon as={IoMdExit} color="#FF3535" boxSize={6} />
          </Button>
          <Heading
            as="h2"
            ml="20px"
            color="#D8E9A8"
            fontSize="25px"
            fontWeight="600"
          >
            ChatGPT
          </Heading>
        </Flex>
      </Flex>

      {/* ChatScreen */}
      <Flex
        minH="545px"
        minW="450px"
        bgColor="#111b21"
        justifyContent="center"
        alignItems="center"
      >
        <AIChat userMessage={userMessage} response={responseText} />
      </Flex>

      {/* Input */}
      <Flex
        minH="65px"
        width="450px"
        bgColor="#202c33"
        alignItems="center"
        justifyContent="center"
      >
        <InputGroup>
          <Input
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            width="420px"
            border="none"
            bgColor="#D8E9A8"
            placeholder="Send a message..."
            ml="20px"
          />
          <InputRightElement>
            {load ? (
              <Spinner size="sm" color="green.500" />
            ) : (
              <IconButton
                as={IoMdSend}
                color="#1E5128"
                boxSize={6}
                mr="20px"
                bg="none"
                _hover={{ bg: "none" }}
                _active={{ bg: "none" }}
                onClick={handlePrompt}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default ChatGptBar;
