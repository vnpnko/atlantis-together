import React, { useRef, useState } from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import VideoComponent from "./VideoComponent.tsx";
import RightBox from "./RightBox.tsx";
import iframeKialo from "../../assets/images/iframe_kialo.png";
import iframeBetterWorldTogether from "../../assets/images/iframe_betterworldtogether.png";
import CustomIframe from "./CustomIframe.tsx";
import CustomImage from "./CustomImage.tsx";
import { useOutsideClick } from "@chakra-ui/react";

const RightPanel: React.FC = () => {
  const [iframeContent, setIframeContent] = useState<string>("");
  const iframeRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: iframeRef,
    handler: () => {
      if (iframeContent) {
        setIframeContent("");
      }
    },
  });

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
        <RightBox w={"80vw"}>
          <VideoComponent />
        </RightBox>
        {iframeContent ? (
          <RightBox h={"full"} w={"20vw"} ref={iframeRef}>
            <CustomIframe src={iframeContent} />
          </RightBox>
        ) : (
          <>
            <Flex
              h={"full"}
              w={"20vw"}
              direction={"column"}
              justifyContent={"space-between"}
              gap={2}
            >
              <RightBox flex={1}>
                <CustomImage
                  src={iframeBetterWorldTogether}
                  onClick={() =>
                    setIframeContent(
                      "https://betterworldtogether.wixsite.com/mysite/copy-of-mauritania",
                    )
                  }
                />
              </RightBox>

              <RightBox flex={1}>
                <CustomImage
                  src={iframeKialo}
                  onClick={() =>
                    setIframeContent(
                      "https://www.kialo.com/atlantis-was-an-existing-place-and-can-be-found-41721",
                    )
                  }
                />
              </RightBox>
            </Flex>
          </>
        )}
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
      <RightBox h="30%" mb={2}>
        <VideoComponent />
      </RightBox>

      {iframeContent ? (
        <RightBox h={"68%"} ref={iframeRef}>
          <CustomIframe src={iframeContent} />
        </RightBox>
      ) : (
        <Flex
          direction="column"
          justifyContent={"space-between"}
          gap={2}
          h={"68%"}
        >
          <RightBox h={"49%"}>
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
          </RightBox>

          <RightBox h={"49%"}>
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
          </RightBox>
        </Flex>
      )}
    </Flex>
  );
};

export default RightPanel;
