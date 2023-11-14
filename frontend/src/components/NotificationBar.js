import { Flex, Heading, Icon, Button } from "@chakra-ui/react";
import { Scrollbars } from "replace-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// React icons import
import { BiArrowBack } from "react-icons/bi";

// Local imports
import { NotificationCard } from "./Card";
import { clearNotifications, getuserProfile } from "../actions/userActions";
import { USER_CLEAR_NOTIFICATIONS_RESET } from "../constants/userConstants";

const NotificationBar = ({ setNoti, profile }) => {
  const dispatch = useDispatch();

  const userNotifications = useSelector((state) => state.userNotifications);
  const { notificationCleared } = userNotifications;

  useEffect(() => {
    if (notificationCleared) {
      dispatch(getuserProfile());
      dispatch({ type: USER_CLEAR_NOTIFICATIONS_RESET });
    }
  }, [notificationCleared, dispatch]);

  const clearNotificationHandler = () => {
    dispatch(clearNotifications(profile.email));
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
                setNoti();
              }}
            >
              <Icon as={BiArrowBack} color="#d9dedd" boxSize="25px" />
            </Button>
            <Heading color="#d9dedd" fontSize="20px" fontWeight="600">
              Friend Requests
            </Heading>
          </Flex>
        </Flex>

        {/* Clear Notification */}
        <Flex
          height="50px"
          maxW="450px"
          bgColor="#111b21"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            height="30px"
            mx="25px"
            bgColor="#f93131"
            color="white"
            onClick={clearNotificationHandler}
          >
            Clear All
          </Button>
        </Flex>

        {/* Notifications */}
        <Flex
          bgColor="#111b21"
          height="565px"
          width="450px"
          justifyContent="center"
          alignItems="center"
        >
          {/* Notification List */}
          <Scrollbars>
            <Flex bgColor="#111b21" direction="column">
              {Object.values(profile ? profile.notifications : {}).map(
                (notify) => {
                  return <NotificationCard notify={notify} />;
                }
              )}
            </Flex>
          </Scrollbars>
        </Flex>
      </Flex>
    </>
  );
};

export default NotificationBar;
