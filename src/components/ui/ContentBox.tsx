import React, { forwardRef } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface RightBoxProps extends BoxProps {
  children?: React.ReactNode;
}

const ContentBox = forwardRef<HTMLDivElement, RightBoxProps>(
  ({ children, ...boxProps }, ref) => {
    return (
      <Box
        ref={ref}
        bg="black"
        borderRadius="lg"
        overflow={"hidden"}
        border="2px"
        borderColor="yellow.500"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        {...boxProps}
      >
        {children}
      </Box>
    );
  },
);

export default ContentBox;
