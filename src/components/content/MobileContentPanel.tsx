import React from "react";
import { Flex } from "@chakra-ui/react";
import Video from "./Video.tsx";
import ContentBox from "../ui/ContentBox.tsx";
import iframeKialo from "../../assets/images/iframe_kialo.png";
import iframeBetterWorldTogether from "../../assets/images/iframe_betterworldtogether.png";
import MobileImage from "../image/MobileImage.tsx";

interface ContentPanelProps {
  iframeContent: string;
  setIframeContent: (url: string) => void;
}

const MobileContentPanel: React.FC<ContentPanelProps> = ({
  iframeContent,
  setIframeContent,
}) => {
  return (
    <Flex direction={"column"} gap={2}>
      <ContentBox h={"180px"}>
        <Video />
      </ContentBox>
      <Flex h={"100px"} direction={"row"} gap={2}>
        <ContentBox w={"50%"}>
          <MobileImage
            iframeContent={iframeBetterWorldTogether}
            isOpen={iframeContent.includes("betterworldtogether")}
            onClick={() => {
              setIframeContent(
                "https://betterworldtogether.wixsite.com/mysite/copy-of-mauritania",
              );
            }}
          />
        </ContentBox>

        <ContentBox w={"50%"}>
          <MobileImage
            iframeContent={iframeKialo}
            isOpen={iframeContent.includes("kialo")}
            onClick={() => {
              setIframeContent(
                "https://www.kialo.com/atlantis-was-an-existing-place-and-can-be-found-41721",
              );
            }}
          />
        </ContentBox>
      </Flex>
    </Flex>
  );
};

export default MobileContentPanel;
