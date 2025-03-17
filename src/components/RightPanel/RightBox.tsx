// components/RightPanel/RightBox.tsx
import React from "react";
import { Box, Image } from "@chakra-ui/react";
import CustomButton from "../shared/CustomButton.tsx";

interface RightBoxProps {
  imageSrc: string;
  onOpen: () => void;
}

const RightBox: React.FC<RightBoxProps> = ({ imageSrc, onOpen }) => {
  return (
    <Box
      w="full"
      h="full"
      position="relative"
      bg="black"
      border="2px"
      borderRadius="lg"
      borderColor="yellow.500"
      cursor="pointer"
      onClick={onOpen}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CustomButton
        label={"OPEN"}
        onClick={onOpen}
        position="absolute"
        zIndex={1}
        width={40}
      />
      <Image
        src={imageSrc}
        alt="Box Cover"
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        objectFit="cover"
        opacity={0.4}
      />
    </Box>
  );
};

export default RightBox;
