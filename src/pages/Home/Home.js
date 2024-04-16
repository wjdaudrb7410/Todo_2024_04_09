import {
  Box,
  Button,
  Container,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { pattern } from "../../pattern";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export const Home = () => {
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
    if (result.password === query.password) {
      nav(`/todo/${query.username}`);
    }
    reset();
  };

  return (
    <Container>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username", {
            required: "필수입력",
            pattern: {
              value: pattern.id,
              message: "영문 숫자조합만 가능합니다.",
            },
          })}
          placeholder="아이디"
        />
        <Text>{errors?.username?.message}</Text>
        <Input
          {...register("password", {
            required: "필수입력",
            pattern: {
              value: pattern.id,
              message: "영문 숫자조합만 가능합니다.",
            },
          })}
          type="password"
          placeholder="비밀번호"
        />
        <Text>{errors?.password?.message}</Text>
        <Button type="submit">로그인</Button>
      </Box>
      <Text>or</Text>
      <Button>
        <Link to={routes.register}>회원가입</Link>
      </Button>
    </Container>
  );
};
