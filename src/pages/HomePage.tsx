import { Box, Flex, Spacer, useBreakpointValue } from "@chakra-ui/react";
import NavigationPanel from "../components/NavigationPanel.tsx";
import ContentPanel from "../components/ContentPanel.tsx";
import MyGlobe from "../components/MyGlobe.tsx";
import { useSearchParams } from "react-router-dom";
import Stage from "../components/Stage.tsx";
import { useState } from "react";
import CustomIframe from "../components/ui/CustomIframe.tsx";
import ContentBox from "../components/ui/ContentBox.tsx";

const HomePage = () => {
  const [iframeContent, setIframeContent] = useState<string>("");

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

  if (isMobile) {
    return (
      <Flex direction={"column"} bg={"black"} h="100vh" w="100vw">
        <Box m={2}>
          <ContentPanel
            iframeContent={iframeContent}
            setIframeContent={setIframeContent}
          />
        </Box>
        <Box h={"50vh"} w={"100vw"} position="relative">
          {iframeContent ? (
            <ContentBox h={"full"} m={2}>
              <CustomIframe
                src={iframeContent}
                onClose={() => setIframeContent("")}
              />
            </ContentBox>
          ) : currentScene ? (
            <Stage isMobile={true} />
          ) : (
            <MyGlobe
              width={window.innerWidth}
              height={window.innerHeight / 2}
              bgColor={false}
              hoveredEpisode={hoveredEpisode}
              setHoveredEpisode={setHoveredEpisode}
            />
          )}
        </Box>
        <Box mb={4} mx={2}>
          <NavigationPanel
            hoveredEpisode={hoveredEpisode}
            setHoveredEpisode={setHoveredEpisode}
            setIframeContent={setIframeContent}
          />
        </Box>
      </Flex>
    );
  }

  return (
    <Flex position="relative" p={5} h="100vh" w="100vw">
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
      >
        {currentScene ? (
          <Stage />
        ) : (
          <MyGlobe
            width={window.innerWidth}
            height={window.innerHeight - 1}
            bgColor={false}
            hoveredEpisode={hoveredEpisode}
            setHoveredEpisode={setHoveredEpisode}
          />
        )}
      </Box>
      <Box zIndex={1}>
        <NavigationPanel
          hoveredEpisode={hoveredEpisode}
          setHoveredEpisode={setHoveredEpisode}
          setIframeContent={setIframeContent}
        />
      </Box>
      <Spacer />
      <Box zIndex={1}>
        <ContentPanel
          iframeContent={iframeContent}
          setIframeContent={setIframeContent}
        />
      </Box>
    </Flex>
  );
};

export default HomePage;
