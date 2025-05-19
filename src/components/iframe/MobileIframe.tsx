import React from "react";
import { Box, BoxProps, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface MobileIframeProps extends BoxProps {
  src: string;
  onClose: () => void;
}

const MobileIframe: React.FC<MobileIframeProps> = ({ src, onClose }) => {
  const isWixsite = src.includes("wixsite");

  return (
    <Box position="relative" w="full" h="full">
      <Button
        colorScheme={"red"}
        position={"absolute"}
        bg={"yellow.500"}
        _hover={{ bg: "yellow.600" }}
        right={0}
        top={0}
        h={"48px"}
        w={"60px"}
        borderRadius={"0 0 0 5px"}
        onClick={onClose}
        zIndex={1000}
      >
        <CloseIcon boxSize={6} color={"yellow.700"} />
      </Button>
      <Box
        style={
          isWixsite
            ? {
                transform: "scale(1)",
                transformOrigin: "0 0",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }
            : {}
        }
        as="iframe"
        sandbox="allow-scripts allow-same-origin"
        w="full"
        h="full"
        src={src}
        color={"black"}
      />
    </Box>
  );
};

export default MobileIframe;
