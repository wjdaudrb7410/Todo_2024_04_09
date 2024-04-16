import {
  Avatar,
  Box,
  Button,
  Container,
  Text,
  VStack,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  RadioGroup,
  Stack,
  Radio,
  Alert,
  AlertIcon,
  Checkbox,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
const currentPriority = "Priority";
export const Todos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultpri: { Priority: "" },
  });
  const onSubmit = (data) => {
    const todo = data;
    console.log(todos);
    setTodos([
      ...todos,
      //기존에 객체가 있는 상태에서 새로는 객체를 이어서 붙여준다.
      //기존에 있는 배열을 까고 객체만 불러온다
      {
        id: Date.now(),
        Schedule: todo.Schedule,
        Priority: todo.Priority,
        finish: false,
      },
    ]);
    console.log(todos);
  };
  const onChanges = (id) => {
    setTodos(
      todos.map((data) =>
        data.id === id ? { ...data, finish: !data.finish } : data
      )
    );
  };
  const onClickDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const today = new Date();
  const cancelRef = useRef();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("하");
  const [currentID, setCurrentID] = useState();
  const [userdata, SetData] = useState(() => {
    const data = localStorage.getItem(id);
    return data ? JSON.parse(data) : [];
  });
  const [todos, setTodos] = useState(() => {
    const getTodo = localStorage.getItem(userdata.index);
    return getTodo ? JSON.parse(getTodo) : [];
  });
  useEffect(() => {
    localStorage.setItem(userdata.index, JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <Container>
        <Header Username={userdata.username} />
        <Text>오늘</Text>
        <Text>
          {today.getMonth()}월{today.getDay()}일
        </Text>

        <Accordion allowToggle>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex={1} textAlign={"left"}>
                    할일 추가하기
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      placeholder="할일"
                      {...register("Schedule", {
                        required: "할일을 입력하세요",
                      })}
                    />
                    {errors?.Schedule?.message && (
                      <Alert status="error" borderRadius={10}>
                        <AlertIcon />
                        {errors?.Schedule?.message}
                      </Alert>
                    )}
                    <RadioGroup onChange={setValue} value={value}>
                      <Stack direction={"row"}>
                        <Radio
                          colorScheme="green"
                          value="하"
                          {...register(currentPriority)}
                        >
                          하
                        </Radio>
                        <Radio
                          colorScheme="yellow"
                          value="중"
                          {...register(currentPriority)}
                        >
                          중
                        </Radio>
                        <Radio
                          colorScheme="red"
                          value="상"
                          {...register(currentPriority)}
                        >
                          상
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    <Button type="submit">제출</Button>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
        <VStack>
          {userdata &&
            todos.map((rsl) => (
              <Box key={rsl.id}>
                <Checkbox
                  p={"15px"}
                  size={"lg"}
                  isChecked={rsl.finish}
                  onChange={() => onChanges(rsl.id)}
                />
                {rsl.Schedule}
                <DeleteIcon
                  onClick={() => {
                    onOpen();
                    //연결된 창을 열어주는 것으로 onOpen 과 isOpen은 서로 같이 써줘야함.
                    setCurrentID(rsl.id);
                    // 현재의 아이디값을 넘겨줌으로써 어떤것인지를 알려줌.
                  }}
                />
                <RadioGroup value={rsl.Priority}>
                  <Stack direction={"row"}>
                    <Radio colorScheme="green" value="하">
                      하
                    </Radio>
                    <Radio colorScheme="yellow" value="중">
                      중
                    </Radio>
                    <Radio colorScheme="red" value="상">
                      상
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            ))}
        </VStack>
        <AlertDialog isOpen={isOpen}>
          {/* 열릴 것에는 isOpen */}
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>삭제 확인</AlertDialogHeader>

              <AlertDialogBody>정말 삭제하시겠습니까?</AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  취소
                </Button>
                <Button
                  onClick={() => {
                    onClickDelete(currentID);
                    onClose();
                    //onClose는 닫기이다.
                  }}
                >
                  삭제
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    </>
  );
};
