import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Center,
  Container,
  HStack,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";

export const Header = ({ Username }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container>
      <HStack justifyContent={"space-between"}>
        <Heading height="100%" color="yellow.400">
          WTD
        </Heading>
        <HStack>
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          ></IconButton>
          <Text textAlign={"Center"} width={100}>
            환영합니다
            {Username}!
          </Text>
          <Avatar name={Username} />
        </HStack>
      </HStack>
    </Container>
  );
};
