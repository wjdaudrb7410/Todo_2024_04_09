import {
  Box,
  Button,
  Container,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  VStack,
  position,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { pattern } from "../../pattern";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { Header } from "../../components/Header";
import { HelmetTitle } from "../../components/HelmetTitle";
import { ErrMsg, radius } from "../../constant/parameter";
import { FaUser } from "react-icons/fa";
import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
export const Home = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const result = data;
    const query = JSON.parse(window.localStorage.getItem(result.username));
    console.log(query);
    if (result.password === query?.password) {
      nav(`/todo/${query.username}`);
    } else {
      toast({
        title: "아이디 혹은 비밀번호가 틀렸습니다.",
        status: "error",
        isClosable: true,
      });
    }
    reset();
  };
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Container
      height={"100vh"}
      p={"20px 30px"}
      display={"flex"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
    >
      <HelmetTitle title={"Home"} />
      <Header />
      <VStack textAlign={"center"}>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          width={"100%"}
          padding={"0 10px"}
        >
          {/*아이디Section*/}
          <InputGroup>
            <InputLeftElement
              top={5}
              left={1}
              pointerEvents={"none"}
              h="full"
              children={<FaUser size={20} />}
            ></InputLeftElement>

            <Input
              boxShadow="lg"
              {...register("username", {
                required: ErrMsg.require,
                pattern: {
                  value: pattern.id,
                  message: "영문 숫자조합만 가능합니다.",
                },
              })}
              placeholder="아이디"
              marginTop={10}
              borderRadius={radius.main}
            />
          </InputGroup>
          <Text>{errors?.username?.message}</Text>
          {/*비밀번호Section*/}
          <InputGroup>
            <InputLeftElement
              top={3}
              left={1}
              pointerEvents={"none"}
              children={<LockIcon boxSize={5} />}
            ></InputLeftElement>

            <Input
              boxShadow="lg"
              {...register("password", {
                required: ErrMsg.require,
                pattern: {
                  value: pattern.id,
                  message: "영문 숫자조합만 가능합니다.",
                },
              })}
              type={show ? "text" : "password"}
              placeholder="비밀번호"
              marginTop={3}
              borderRadius={radius.main}
            />
            <InputRightElement
              top={3}
              right={1}
              pointerEvents={"all"}
              onClick={handleClick}
              children={
                show ? <ViewIcon boxSize={5} /> : <ViewOffIcon boxSize={5} />
              }
            />
          </InputGroup>
          <Text>{errors?.password?.message}</Text>
          {/*로그인 버튼*/}
          <Button
            type={"submit"}
            height={7}
            width={150}
            borderRadius={radius.main}
            marginTop={5}
          >
            로그인
          </Button>
          {/*구분선*/}
          <Divider margin={"10px 0"} />
          {/*회원가입 버튼*/}
          <Link to={routes.register}>
            <Button height={7} width={150} borderRadius={radius.main}>
              회원가입
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};
