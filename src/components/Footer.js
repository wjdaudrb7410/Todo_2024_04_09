import { Container, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Container
      bg={"gray.400"}
      textAlign={"center"}
      position={"absolute"}
      left={0}
      bottom={0}
      right={0}
    >
      <Text>published by : Myung gyu Jung</Text>
    </Container>
  );
};
