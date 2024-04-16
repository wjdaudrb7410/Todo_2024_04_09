import { Container } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { HelmetTitle } from "../../components/HelmetTitle";

export const FoF = () => {
  return (
    <Container>
      <HelmetTitle title={"404"} />
      <Header></Header>
    </Container>
  );
};
