import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Container,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Color } from "../constant/parameter";

export const Header = ({ Username }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      height={"80px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <HStack justifyContent={"space-between"}>
        <Heading height="100%" color={Color.Point} fontSize={24}>
          <Link to={Username ? `/todo/${Username}` : "/"}>WTD</Link>
        </Heading>
        <HStack spacing={3}>
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          ></IconButton>
          {Username ? (
            <>
              <Menu>
                <MenuButton>
                  <Avatar size={"sm"} name={Username} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to={"/"}>로그아웃</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <></>
          )}
        </HStack>
      </HStack>
    </Container>
  );
};
