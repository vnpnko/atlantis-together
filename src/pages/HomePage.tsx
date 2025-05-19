import { Box, Flex, Spacer, useBreakpointValue } from "@chakra-ui/react";
import MobileContentPanel from "../components/content/MobileContentPanel.tsx";
import MyGlobe from "../components/MyGlobe.tsx";
import { useSearchParams } from "react-router-dom";
import Stage from "../components/Stage.tsx";
import React, { useState } from "react";
import ContentBox from "../components/ui/ContentBox.tsx";
import DesktopNavPanel from "../components/navigation/DesktopNavPanel.tsx";
import MobileNavPanel from "../components/navigation/MobileNavPanel.tsx";
import DesktopContentPanel from "../components/content/DesktopContentPanel.tsx";
import MobileIframe from "../components/iframe/MobileIframe.tsx";

const HomePage: React.FC = () => {
  const [iframeContent, setIframeContent] = useState<string>("");

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

  if (isMobile) {
    return (
      <Flex direction="column" bg="black" p={2} gap={2}>
        <MobileContentPanel
          iframeContent={iframeContent}
          setIframeContent={setIframeContent}
        />

        <Box position="relative" borderRadius={"md"} overflow={"hidden"}>
          {iframeContent ? (
            <ContentBox h={window.innerHeight * 0.9 - 310}>
              <MobileIframe
                src={iframeContent}
                onClose={() => setIframeContent("")}
              />
            </ContentBox>
          ) : currentScene ? (
            <Stage height={window.innerHeight * 0.9 - 310} isMobile />
          ) : (
            <MyGlobe
              width={window.innerWidth}
              height={window.innerHeight * 0.9 - 310}
              bgColor={false}
              hoveredEpisode={hoveredEpisode}
              setHoveredEpisode={setHoveredEpisode}
            />
          )}
        </Box>

        <MobileNavPanel
          hoveredEpisode={hoveredEpisode}
          setHoveredEpisode={setHoveredEpisode}
          setIframeContent={setIframeContent}
        />
      </Flex>
    );
  }

  return (
    <Flex
      position="relative"
      width={window.innerWidth}
      height={window.innerHeight}
      p={5}
    >
      <Box position="absolute" top={0} left={0} zIndex={0}>
        {currentScene ? (
          <Stage />
        ) : (
          <MyGlobe
            width={window.innerWidth}
            height={window.innerHeight}
            bgColor={false}
            hoveredEpisode={hoveredEpisode}
            setHoveredEpisode={setHoveredEpisode}
          />
        )}
      </Box>

      <Box zIndex={1}>
        <DesktopNavPanel
          hoveredEpisode={hoveredEpisode}
          setHoveredEpisode={setHoveredEpisode}
          setIframeContent={setIframeContent}
        />
      </Box>

      <Spacer />

      <Box zIndex={1}>
        <DesktopContentPanel
          iframeContent={iframeContent}
          setIframeContent={setIframeContent}
        />
      </Box>
    </Flex>
  );
};

export default HomePage;
