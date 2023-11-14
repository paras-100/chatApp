import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const Message = ({ type = "info", children }) => {
  return (
    <Alert status={type} mb="20px" width="335px" borderRadius="10px">
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};

export default Message;
