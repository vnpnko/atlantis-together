import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Video from "./Video.tsx";
import ContentBox from "../ui/ContentBox.tsx";
import iframeKialo from "../../assets/images/iframe_kialo.png";
import iframeBetterWorldTogether from "../../assets/images/iframe_betterworldtogether.png";
import DesktopIframe from "../iframe/DesktopIframe.tsx";
import CustomImage from "../iframe/CustomImage.tsx";
import { CloseIcon } from "@chakra-ui/icons";

interface ContentPanelProps {
  iframeContent: string;
  setIframeContent: (url: string) => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  iframeContent,
  setIframeContent,
}) => {
  return (
    <Flex
      position="relative"
      direction={"column"}
      h={"100%"}
      width={window.innerWidth * 0.25}
    >
      <ContentBox h={"38%"} mb={2}>
        <Video />
      </ContentBox>

      {iframeContent ? (
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
            <DesktopIframe src={iframeContent} />
          </ContentBox>
        </Box>
      ) : (
        <Flex right={0} direction="column" gap={2} h={"60%"}>
          <ContentBox h={"50%"}>
            <CustomImage
              src={iframeBetterWorldTogether}
              onMouseEnter={() =>
                setIframeContent(
                  "https://betterworldtogether.wixsite.com/mysite/copy-of-mauritania",
                )
              }
              onClick={() =>
                setIframeContent(
                  "https://betterworldtogether.wixsite.com/mysite/copy-of-mauritania",
                )
              }
            />
          </ContentBox>

          <ContentBox h={"50%"}>
            <CustomImage
              src={iframeKialo}
              onMouseEnter={() =>
                setIframeContent(
                  "https://www.kialo.com/atlantis-was-an-existing-place-and-can-be-found-41721",
                )
              }
              onClick={() =>
                setIframeContent(
                  "https://www.kialo.com/atlantis-was-an-existing-place-and-can-be-found-41721",
                )
              }
            />
          </ContentBox>
        </Flex>
      )}
    </Flex>
  );
};

export default ContentPanel;
