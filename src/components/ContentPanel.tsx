import React, { useRef } from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import Video from "./ui/Video.tsx";
import ContentBox from "./ui/ContentBox.tsx";
import iframeKialo from "../assets/images/iframe_kialo.png";
import iframeBetterWorldTogether from "../assets/images/iframe_betterworldtogether.png";
import CustomIframe from "./ui/CustomIframe.tsx";
import CustomImage from "./ui/CustomImage.tsx";

interface ContentPanelProps {
  iframeContent: string;
  setIframeContent: (url: string) => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  iframeContent,
  setIframeContent,
}) => {
  const iframeRef = useRef<HTMLDivElement>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Flex
        h={"20vh"}
        direction={"row"}
        justifyContent={"space-between"}
        gap={2}
        flex={1}
      >
        <ContentBox w={"80vw"}>
          <Video />
        </ContentBox>
        <Flex
          h={"full"}
          w={"20vw"}
          direction={"column"}
          justifyContent={"space-between"}
          gap={2}
        >
          <ContentBox flex={1}>
            <CustomImage
              src={iframeBetterWorldTogether}
              onClick={() =>
                setIframeContent(
                  "https://betterworldtogether.wixsite.com/mysite/copy-of-mauritania",
                )
              }
            />
          </ContentBox>

          <ContentBox flex={1}>
            <CustomImage
              src={iframeKialo}
              onClick={() =>
                setIframeContent(
                  "https://www.kialo.com/atlantis-was-an-existing-place-and-can-be-found-41721",
                )
              }
            />
          </ContentBox>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      direction={"column"}
      justifyContent={"space-between"}
      h="full"
      width="25vw"
    >
      <ContentBox h="30%" mb={2}>
        <Video />
      </ContentBox>

      {iframeContent ? (
        <ContentBox
          position={"absolute"}
          bottom={5}
          right={5}
          w={"40%"}
          h={"64%"}
          ref={iframeRef}
        >
          <CustomIframe
            src={iframeContent}
            onClose={() => setIframeContent("")}
          />
        </ContentBox>
      ) : (
        <Flex
          direction="column"
          justifyContent={"space-between"}
          gap={2}
          h={"68%"}
        >
          <ContentBox h={"49%"}>
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

          <ContentBox h={"49%"}>
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
