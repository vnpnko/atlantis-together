import React from "react";
import { Box, BoxProps, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface CustomIframeProps extends BoxProps {
  src: string;
  onClose: () => void;
}

const CustomIframe: React.FC<CustomIframeProps> = ({ src, onClose }) => {
  const isWixsite = src.includes("wixsite");

  return (
    <Box position="relative" w="full" h="full">
      <Button
        colorScheme={"red"}
        position={"absolute"}
        bg={"yellow.500"}
        _hover={{ bg: "yellow.600" }}
        mt={"-7.6%"}
        h={"10%"}
        w={"36%"}
        borderRadius={"5px 5px 0 0"}
        onClick={onClose}
      >
        <CloseIcon color={"yellow.700"} />
      </Button>
      <Box
        style={
          isWixsite
            ? {
                transform: "scale(0.6)", // Scale to 80% to zoom out
                transformOrigin: "0 0", // Keep the scaling from the top-left corner
                width: "167%", // Adjust width if needed
                height: "167%", // Adjust height if needed
                overflow: "hidden", // Hide any content that overflows
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

export default CustomIframe;
