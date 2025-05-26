import React from "react";
import { Box, BoxProps, Image, Text } from "@chakra-ui/react";

interface CustomImageProps extends BoxProps {
  iframeContent: string;
}

const DesktopImage: React.FC<CustomImageProps> = ({
  iframeContent,
  ...boxProps
}) => {
  return (
    <Box position="relative" w="full" h="full" {...boxProps}>
      <Image
        src={iframeContent}
        alt="Custom Image"
        w="full"
        h="full"
        objectFit="cover"
        opacity={0.4}
      />
      <Box
        position="absolute"
        inset={0}
        opacity={0}
        _hover={{ opacity: 1 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="white" fontWeight="bold" textAlign="center">
          Click to interact
        </Text>
      </Box>
    </Box>
  );
};

export default DesktopImage;
