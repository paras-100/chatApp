import {
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

// React icons import

import { BiArrowBack } from "react-icons/bi";
import { FaPen } from "react-icons/fa";

// Local imports
import { getuserProfile } from "../actions/userActions";

const ProfileBar = ({ setInfo, userProfile }) => {
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    dispatch(getuserProfile());
  }, [profileImage, dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `/api/uploads?email=${userProfile.email}`,
        formData,
        config
      );
      setProfileImage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  return (
    <>
      <Flex direction="column" bgColor="white" minW="450px" maxH="670px">
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
            width="130px"
            my="10px"
            mx="10px"
          >
            <Button
              bg="none"
              _hover={{ bg: "none" }}
              onClick={() => {
                setInfo();
              }}
            >
              <Icon as={BiArrowBack} color="#d9dedd" boxSize="25px" />
            </Button>
            <Heading color="#d9dedd" fontSize="20px" fontWeight="600">
              Profile
            </Heading>
          </Flex>
        </Flex>

        {/* Profile */}
        <Flex
          bgColor="#111b21"
          height="565px"
          width="450px"
          justifyContent="center"
          alignItems="center"
        >
          <Flex width="420px" height="500px" direction="column">
            <Flex
              justifyContent="center"
              alignItems="center"
              width="420px"
              mb="28px"
              direction="column"
            >
              <Image
                src={userProfile ? userProfile.profilePic : null}
                objectFit="cover"
                boxSize="200px"
                borderRadius="100px"
              />

              <Menu>
                <MenuButton
                  as={Button}
                  isLoading={uploading}
                  mt="15px"
                  bgColor="#138155"
                  color="white"
                  _hover={{ bgColor: "#0B5034" }}
                  _active={{ colorScheme: "#138155" }}
                >
                  Profile Photo
                </MenuButton>
                <MenuList
                  pos="relative"
                  right="50px"
                  bgColor="#233138"
                  border="none"
                >
                  <label
                    for="image-file"
                    style={{
                      fontSize: "20px",
                      color: "white",
                      fontWeight: "500",
                      paddingLeft: "55px",
                      paddingRight: "55px",
                    }}
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="image-file"
                    style={{ visibility: "hidden" }}
                    hidden
                    onChange={uploadFileHandler}
                  />
                  <MenuDivider color="white" />

                  <MenuItem
                    as={Button}
                    bgColor="#233138"
                    _hover={{ bgColor: "#141D22" }}
                    color="#FF3131"
                    fontSize="20px"
                  >
                    Remove Photo
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Flex direction="column" height="88px" width="380px" mx="20px">
              <Heading
                color="#19A161"
                fontSize="15px"
                fontWeight="300"
                ml="15px"
              >
                Your name
              </Heading>
              <Flex alignItems="center">
                <Input
                  isReadOnly={true}
                  placeholder="Your name"
                  pt="20px"
                  border="none"
                  color="white"
                  _focusVisible="none"
                  value={userProfile ? userProfile.name : null}
                />
                <Icon as={FaPen} color="#8696a0" boxSize="20px" />
              </Flex>
            </Flex>

            <Flex height="20px" width="380px" mx="35px" mb="30px">
              <Heading fontSize="15px" fontWeight="300" color="#8696a0">
                This name will be visible to your friends
              </Heading>
            </Flex>

            <Flex direction="column" height="88px" width="380px" mx="20px">
              <Heading
                color="#19A161"
                fontSize="15px"
                fontWeight="300"
                ml="15px"
              >
                Email
              </Heading>
              <Flex alignItems="center">
                <Input
                  isReadOnly={true}
                  placeholder="Your name"
                  pt="20px"
                  border="none"
                  color="white"
                  _focusVisible="none"
                  value={userProfile ? userProfile.email : null}
                />
                <Icon as={FaPen} color="#8696a0" boxSize="20px" />
              </Flex>
            </Flex>

            <Flex height="20px" width="380px" mx="35px">
              <Heading fontSize="15px" fontWeight="300" color="#8696a0">
                Use this as your user name
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ProfileBar;
