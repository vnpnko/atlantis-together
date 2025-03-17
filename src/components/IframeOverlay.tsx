import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface IframeOverlayProps {
  contentUrl: string;
  onClose: () => void;
  findSource: () => void;
}

const IframeOverlay: React.FC<IframeOverlayProps> = ({
  contentUrl,
  onClose,
  findSource,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Button colorScheme="blue" onClick={findSource}>
              Open in New Tab
            </Button>
            <IconButton
              aria-label="Close"
              icon={<CloseIcon />}
              onClick={onClose}
            />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <iframe
            title="Iframe Content"
            src={contentUrl}
            width="100%"
            height="450px"
            style={{ border: "none" }}
          />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default IframeOverlay;
