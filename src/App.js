import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
import {
  Container,
  Heading,
  Box,
  Input,
  VStack,
  Checkbox,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
export const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancleRef = useRef();
  const [current, setCurrent] = useState();
  const [todos, setTodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmitTodo = (data) => {
    console.log(data);
    const { todo } = data;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todo,
        finish: false,
      },
    ]);
    reset();
  };
  const onClickDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const onChangeCheck = (id) => {
    setTodos(
      todos.map((data) =>
        data.id === id ? { ...data, finish: !data.finish } : data
      )
    );
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <Container
        maxW={"450px"}
        h={"100vh"}
        w={"100%"}
        m={"0 auto"}
        bgColor={"gray.100"}
        p={"50px 20px"}
      >
        <Heading>WHAT TODO</Heading>
        <Box as="form" onSubmit={handleSubmit(onSubmitTodo)}>
          <Input
            key={1}
            {...register("todo", { required: true })}
            placeholder="할일을 입력해주세요."
            m={"30px 0"}
            borderColor={"gray.400"}
            size={"md"}
          />
        </Box>

        <VStack>
          {todos.map((data) => (
            <>
              <Checkbox
                key={data.id}
                w={"100%"}
                h={"60px"}
                bgColor={"white"}
                p={"15px"}
                size={"lg"}
                isChecked={data.finish}
                onChange={() => onChangeCheck(data.id)}
              >
                <Flex justifyContent={"space-between"}>
                  <Box>{data.text}</Box>
                  <DeleteIcon
                    onClick={() => {
                      onOpen();
                      setCurrent(data.id);
                    }}
                  />
                </Flex>
              </Checkbox>
            </>
          ))}
        </VStack>
        <AlertDialog isOpen={isOpen}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                삭제하겟습니까?
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancleRef} onClick={onClose}>
                  취소
                </Button>
                <Button
                  onClick={() => {
                    onClickDelete(current);
                    onClose();
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
