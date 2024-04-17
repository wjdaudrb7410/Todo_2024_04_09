import {
  Box,
  Button,
  Container,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { pattern } from "../../pattern";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { Modals } from "../../components/Modals";
import { Header } from "../../components/Header";
import { HelmetTitle } from "../../components/HelmetTitle";
import { ErrMsg, radius } from "../../constant/parameter";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
const Word = {
  Duplicate: "중복된 아이디가 있습니다.",
  Success: "가서 로그인을 시도하세요",
};
export const Register = () => {
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resText, setText] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onRegister = (data) => {
    console.log(data);
    const result = data;
    if (window.localStorage.getItem(result.username)) {
      setText(Word.Duplicate);
    } else {
      window.localStorage.setItem(
        result.username,
        JSON.stringify({
          index: Date.now(),
          ...result,
        })
      );
      setText(Word.Success);
    }
    onOpen();
    reset();
  };
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Container height={"100vh"} p={"20px 30px"}>
      <HelmetTitle title={"Register"} />
      <Header />
      <Box as="form" onSubmit={handleSubmit(onRegister)}>
        <VStack spacing={2} marginTop={5}>
          {/* 이메일Section */}
          <InputGroup>
            <InputLeftElement>
              <InputLeftElement
                left={1}
                pointerEvents={"none"}
                children={<EmailIcon boxSize={5} />}
              ></InputLeftElement>
            </InputLeftElement>
            <Input
              boxShadow="lg"
              placeholder="이메일"
              borderRadius={radius.main}
              {...register("email", {
                required: ErrMsg.require,
                minLength: {
                  value: 4,
                  message: "이메일이 너무 짧습니다.",
                },
                pattern: {
                  value: pattern.email,
                  message: "이메일 형식에 맞게 작성해주세요",
                },
              })}
            />
          </InputGroup>
          {/* 아이디Section */}
          <Text>{errors?.email?.message}</Text>
          <InputGroup>
            <InputLeftElement>
              <InputLeftElement
                left={1}
                pointerEvents={"none"}
                children={<FaUser size={20} />}
              ></InputLeftElement>
            </InputLeftElement>
            <Input
              boxShadow="lg"
              placeholder="아이디"
              borderRadius={radius.main}
              {...register("username", {
                required: ErrMsg.require,
                minLength: {
                  value: 2,
                  message: "2자리 이상입니다.",
                },
                pattern: {
                  value: pattern.id,
                  message: "영문 숫자조합만 가능합니다.",
                },
              })}
            />
          </InputGroup>
          <Text>{errors?.username?.message}</Text>
          {/* 비밀번호Section */}
          <InputGroup>
            <InputLeftElement
              left={1}
              pointerEvents={"none"}
              children={<LockIcon boxSize={5} />}
            ></InputLeftElement>
            <Input
              boxShadow="lg"
              placeholder="비밀번호"
              borderRadius={radius.main}
              type={show ? "text" : "password"}
              {...register("password", {
                required: ErrMsg.require,
                minLength: {
                  value: 3,
                  message: "최소 3자리 이상",
                },
                pattern: {
                  value: pattern.password,
                  message: "특수문자가 포함되어야 합니다.",
                },
              })}
            />
            <InputRightElement
              right={1}
              pointerEvents={"all"}
              onClick={handleClick}
              children={
                show ? <ViewIcon boxSize={5} /> : <ViewOffIcon boxSize={5} />
              }
            />
          </InputGroup>
          <Text>{errors?.password?.message}</Text>
          {/* 회원가입 버튼 */}
          <Button
            colorScheme="blue"
            type="submit"
            height={7}
            width={150}
            borderRadius={radius.main}
            marginTop={5}
          >
            회원가입
          </Button>
          <Divider margin={"10px 0"}></Divider>
          {/* 로그인 페이지 이동 버튼 */}
          <Button height={7} width={150} borderRadius={radius.main}>
            <Link to={routes.home}>로그인 페이지로</Link>
          </Button>
          {/* 모달창 */}
          <Modals isopen={isOpen} onClose={onClose} Text={resText} />
        </VStack>
      </Box>
    </Container>
  );
};
