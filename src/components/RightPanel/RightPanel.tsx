import React, { useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";
import VideoComponent from "./VideoComponent.tsx";
import RightBox from "./RightBox.tsx";
import iframeKialo from "../../assets/images/iframe_kialo.png";
import iframeBetterWorldTogether from "../../assets/images/iframe_betterworldtogether.png";
import CustomIframe from "./CustomIframe.tsx";
import CustomImage from "./CustomImage.tsx";
import { useOutsideClick } from "@chakra-ui/icons";

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

  return (
    <Flex
      direction={"column"}
      justifyContent={"space-between"}
      h="660px"
      width="400px"
      zIndex={1}
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
          {/*  zIndex={3}*/}
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
            />
          </RightBox>
        </>
      )}
    </Flex>
  );
};

export default RightPanel;
