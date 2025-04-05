import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface RightBoxProps extends BoxProps {
  ref?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
}

const RightBox: React.FC<RightBoxProps> = ({ ref, children, ...boxProps }) => {
  return (
    <Box
      ref={ref}
      bg="black"
      border="2px"
      borderColor="yellow.500"
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default RightBox;
