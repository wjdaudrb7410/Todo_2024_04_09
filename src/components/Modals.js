import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Skeleton,
  Button,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Modals = ({ isopen, onClose, Text }) => {
  const [resText, setText] = useState();
  const [isLoading, SetLoading] = useState(true);
  useEffect(() => {
    setText(Text);
    SetLoading(false);
  }, [Text]);
  return (
    <Modal onClose={onClose} isOpen={isopen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원가입 결과</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            resText && <Box>{resText}</Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onClose}>
            <Link to={"/"}>로그인 페이지로</Link>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
