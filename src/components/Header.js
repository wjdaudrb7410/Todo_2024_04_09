import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Center,
  Container,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Header = ({ Username }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container>
      <HStack justifyContent={"space-between"}>
        <Heading height="100%" color="yellow.400">
          <Link to={Username ? `/todo/${Username}` : "/"}>WTD</Link>
        </Heading>
        <HStack>
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          ></IconButton>
          {Username ? (
            <>
              <Text textAlign={"Center"} width={100}>
                환영합니다
                {Username}!
              </Text>
              <Menu>
                <MenuButton>
                  <Avatar name={Username} />
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
