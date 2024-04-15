import {
  Box,
  Button,
  Container,
  Input,
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
const Word = {
  Duplicate: "중복된 아이디가 있습니다.",
  Success: "가서 로그인을 시도하세요",
};
export const Register = () => {
  const [canOpen, SetOpen] = useState(false);
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
      SetOpen(!canOpen);
    } else {
      window.localStorage.setItem(
        result.username,
        JSON.stringify({
          index: Date.now(),
          ...result,
        })
      );
      setText(Word.Success);
      SetOpen(true);
    }
    reset();
  };
  return (
    <Container>
      <Box as="form" onSubmit={handleSubmit(onRegister)}>
        <VStack spacing={3}>
          <Input
            placeholder="이메일"
            {...register("email", {
              required: "이메일을 입력하세요",
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
          <Text>{errors?.email?.message}</Text>
          <Input
            placeholder="아이디"
            {...register("username", {
              required: "아이디를 입력하세요",
              minLength: {
                value: 8,
                message: "8자리 이상입니다.",
              },
              pattern: {
                value: pattern.id,
                message: "영문 숫자조합만 가능합니다.",
              },
            })}
          />
          <Text>{errors?.username?.message}</Text>
          <Input
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호를 입력하세요",
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
          <Text>{errors?.password?.message}</Text>
          <Button
            colorScheme="blue"
            type="submit"
            onClick={() => {
              if (canOpen) {
                onOpen();
                SetOpen(false);
              }
            }}
          >
            회원가입
          </Button>
          <Button>
            <Link to={routes.home}>로그인 페이지로</Link>
          </Button>
          <Modals isopen={isOpen} onClose={onClose} Text={resText}></Modals>
        </VStack>
      </Box>
    </Container>
  );
};
