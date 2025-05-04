import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface CustomIframeProps extends BoxProps {
  src: string;
}

const CustomIframe: React.FC<CustomIframeProps> = ({ src }) => {
  return <Box as="iframe" w="full" h="full" src={src} />;
};

export default CustomIframe;
