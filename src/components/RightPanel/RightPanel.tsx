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
      <Flex direction={"row"} justifyContent={"space-between"}>
        <RightBox h={"170px"}>
          <VideoComponent />
        </RightBox>
        {iframeContent ? (
          <RightBox w={"100px"} ref={iframeRef}>
            <CustomIframe src={iframeContent} />
          </RightBox>
        ) : (
          <>
            <Flex direction={"column"} justifyContent={"space-between"}>
              <RightBox h={"80px"} w={"100px"}>
                <CustomImage
                  src={iframeBetterWorldTogether}
                  onClick={() =>
                    setIframeContent(
                      "https://betterworldtogether.wixsite.com/mysite/copy-of-mauritania",
                    )
                  }
                />
              </RightBox>

              <RightBox h={"80px"} w={"100px"}>
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
      h="660px"
      width="400px"
    >
      <RightBox h="220px">
        <VideoComponent />
      </RightBox>

      {iframeContent ? (
        <RightBox h="420px" ref={iframeRef}>
          {/*<CustomButton*/}
          {/*  position={"absolute"}*/}
          {/*  bottom={2}*/}
          {/*  left={"50%"}*/}
          {/*  transform={"translateX(-50%)"}*/}
          {/*  w={"100px"}*/}
          {/*  onClick={() => setIframeContent("")}*/}
          {/*  label="Close"*/}
          {/*/>*/}
          <CustomIframe
            src={iframeContent}
            // onMouseLeave={() => setIframeContent("")}
          />
        </RightBox>
      ) : (
        <>
          <RightBox h="200px">
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

          <RightBox h="200px">
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
        </>
      )}
    </Flex>
  );
};

export default RightPanel;
