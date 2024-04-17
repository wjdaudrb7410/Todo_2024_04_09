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
  Divider,
  flattenTokens,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { HelmetTitle } from "../../components/HelmetTitle";
import { ErrMsg, radius } from "../../constant/parameter";
const currentPriority = "Priority";
export const Todos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    reset();
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

  const todays = new Date();

  const cancelRef = useRef();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [today, SetDay] = useState({
    Month: todays.getMonth(),
    Day: todays.getDay(),
  });
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
      <Container height={"100vh"} p={"20px 30px"}>
        <HelmetTitle title={"Todo"} />
        <Header Username={userdata.username} />
        <Text fontSize={"xl"} fontWeight={"700"}>
          오늘
        </Text>
        <Text>
          {today.Month + 1}월{today.Day + 14}일
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
                  <Box
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Input
                      boxShadow="lg"
                      placeholder="할일"
                      {...register("Schedule", {
                        required: ErrMsg.require,
                      })}
                      borderRadius={radius.main}
                      marginTop={3}
                    />
                    {errors?.Schedule?.message && (
                      <Alert status="error" borderRadius={radius.main}>
                        <AlertIcon />
                        {errors?.Schedule?.message}
                      </Alert>
                    )}
                    <Divider padding={"10px 0"} />
                    <RadioGroup
                      onChange={setValue}
                      value={value}
                      marginTop={3}
                      alignSelf={"center"}
                    >
                      <Stack direction={"row"} spacing={10}>
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
                    <Divider padding={"10px 0"} />
                    <Button
                      type="submit"
                      borderRadius={radius.main}
                      height={7}
                      alignSelf={"flex-end"}
                      marginTop={3}
                    >
                      제출
                    </Button>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
        <VStack>
          {userdata &&
            todos.map((rsl) => (
              <Box
                key={rsl.id}
                display={"flex"}
                width={"100%"}
                height={"80px"}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius={10}
                marginTop={5}
                boxShadow={"lg"}
              >
                <Checkbox
                  p={"15px"}
                  size={"lg"}
                  isChecked={rsl.finish}
                  onChange={() => onChanges(rsl.id)}
                />
                <VStack>
                  <Text>{rsl.Schedule}</Text>
                  <RadioGroup value={rsl.Priority}>
                    <Stack direction={"row"} spacing={10}>
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
                </VStack>
                <IconButton
                  marginRight={5}
                  icon={<DeleteIcon />}
                  onClick={() => {
                    onOpen();
                    setCurrentID(rsl.id);
                  }}
                ></IconButton>
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
