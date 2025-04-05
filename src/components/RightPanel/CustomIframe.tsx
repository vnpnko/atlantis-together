import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface CustomIframeProps extends BoxProps {
  src: string;
  onMouseLeave?: () => void;
}

const CustomIframe: React.FC<CustomIframeProps> = ({ src, onMouseLeave }) => {
  return (
    <Box as="iframe" w="full" h="full" src={src} onMouseLeave={onMouseLeave} />
  );
};

export default CustomIframe;
