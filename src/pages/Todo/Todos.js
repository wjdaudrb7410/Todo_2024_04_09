import {
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
      <Container height={"100vh"}>
        <HelmetTitle title={"Todo"} />
        <Box
          border={"1px"}
          borderColor={"gray.200"}
          borderTop={0}
          borderBottomRadius={"20px"}
          bgColor={"whiteAlpha.300"}
        >
          <Header Username={userdata.username} />
          <Box margin={"60px 20px"}>
            <Text fontSize={"xl"} fontWeight={"700"}>
              Today
            </Text>
            <Text fontSize={12} opacity={0.7}>
              {today.Month + 1}월{today.Day + 14}일
            </Text>
            <Accordion allowToggle>
              <AccordionItem
                border={"none"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      bgColor={"gray.200"}
                      display={"flex"}
                      justifyContent={"center"}
                      width={30}
                      borderRadius={"50%"}
                      w={"60px"}
                      h={"60px"}
                      marginTop={"30px"}
                    >
                      {isExpanded ? (
                        <MinusIcon fontSize="16px" />
                      ) : (
                        <AddIcon fontSize="16px" />
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
                          width={"300px"}
                          boxShadow="lg"
                          placeholder="할일"
                          {...register("Schedule", {
                            required: ErrMsg.require,
                          })}
                          borderRadius={radius.main}
                          marginTop={10}
                        />
                        {errors?.Schedule?.message && (
                          <Alert
                            marginTop={2}
                            boxShadow="lg"
                            status="error"
                            borderRadius={radius.main}
                          >
                            <AlertIcon />
                            {errors?.Schedule?.message}
                          </Alert>
                        )}
                        <RadioGroup
                          onChange={setValue}
                          value={value}
                          marginTop={10}
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
                        <Button
                          type="submit"
                          borderRadius={radius.main}
                          height={7}
                          marginTop={10}
                        >
                          추가
                        </Button>
                      </Box>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>

        <VStack>
          {userdata &&
            todos.map((rsl) => (
              <Box
                bgColor={"whiteAlpha.50"}
                key={rsl.id}
                display={"flex"}
                width={"100%"}
                height={"80px"}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius={10}
                marginTop={5}
                boxShadow={"lg"}
                onClick={() => onChanges(rsl.id)}
              >
                <Checkbox p={"15px"} size={"lg"} isChecked={rsl.finish} />
                <VStack alignItems={"flex-start"}>
                  <Text fontSize={"20px"}>{rsl.Schedule}</Text>
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
                <Button ref={cancelRef} onClick={onClose} marginRight={10}>
                  취소
                </Button>
                <Button
                  onClick={() => {
                    onClickDelete(currentID);
                    onClose();
                    //onClose는 닫기이다.
                  }}
                  colorScheme="red"
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
