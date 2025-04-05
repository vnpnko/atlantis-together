import { Box, Flex, Spacer } from "@chakra-ui/react";
import LeftPanel from "../components/LeftPanel/LeftPanel.tsx";
import RightPanel from "../components/RightPanel/RightPanel.tsx";
import MyGlobe from "../components/MyGlobe.tsx";
import Stage from "../components/Stage.tsx";
import { useSearchParams } from "react-router-dom";
import IframeOverlay from "../components/IframeOverlay.tsx";
import { useState } from "react";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

  const [showIframe, setShowIframe] = useState<boolean>(false);
  const [iframeContent, setIframeContent] = useState<string>("");

  const handleBoxClick = (contentUrl: string) => {
    setIframeContent(contentUrl);
    setShowIframe(true);
  };

  const handleCloseOverlay = () => {
    setShowIframe(false);
    setIframeContent("");
  };

  const findSource = () => {
    window.open(iframeContent, "_blank");
  };

  return (
    <Flex position="relative" p={5} h="100vh" w="100vw" align="stretch">
      {/* Background Box */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
      >
        {currentScene ? <Stage /> : <MyGlobe />}
      </Box>
      {/* Foreground Panels */}
      <Box zIndex={1}>
        <LeftPanel />
      </Box>
      {/* Iframe Overlay */}
      {showIframe && (
        <Box h="540px" w="full" zIndex={2}>
          <IframeOverlay
            contentUrl={iframeContent}
            onClose={handleCloseOverlay}
            findSource={findSource}
          />
        </Box>
      )}
      <Spacer />
      <Box zIndex={1}>
        <RightPanel
          onBoxClick={handleBoxClick}
          onCloseOverlay={handleCloseOverlay}
          findSource={findSource}
        />
      </Box>
    </Flex>
  );
};

export default HomePage;
