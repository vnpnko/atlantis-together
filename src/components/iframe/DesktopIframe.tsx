import React from "react";
import { Box, BoxProps, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import ContentBox from "../ui/ContentBox.tsx";

interface CustomIframeProps extends BoxProps {
  iframeContent: string;
  setIframeContent: (url: string) => void;
}

const DesktopIframe: React.FC<CustomIframeProps> = ({
  iframeContent,
  setIframeContent,
}) => {
  const isWixsite = iframeContent.includes("wixsite");

  return (
    <Box
      position={"absolute"}
      w={window.innerWidth * 0.4}
      h={"60%"}
      bottom={0}
      right={0}
    >
      <Button
        position={"absolute"}
        bg={"yellow.500"}
        _hover={{ bg: "yellow.600" }}
        top={"-10%"}
        h={"12%"}
        w={"36%"}
        borderRadius={"5px 5px 0 0"}
        onClick={() => setIframeContent("")}
        zIndex={-1}
      >
        <CloseIcon boxSize={5} color={"yellow.700"} />
      </Button>
      <ContentBox w={"full"} h={"full"}>
        <Box
          style={
            isWixsite
              ? {
                  zoom: 0.6,
                }
              : undefined
          }
          overflow={"hidden"}
          width="100%"
          height="125%"
          position={"relative"}
          as="iframe"
          overscrollY={"none"}
          sandbox="allow-scripts allow-same-origin"
          src={iframeContent}
          color={"black"}
        />
      </ContentBox>
    </Box>
  );
};

export default DesktopIframe;
