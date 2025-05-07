import { Box, Flex, Spacer, useBreakpointValue } from "@chakra-ui/react";
import LeftPanel from "../components/LeftPanel/LeftPanel.tsx";
import RightPanel from "../components/RightPanel/RightPanel.tsx";
import MyGlobe from "../components/MyGlobe.tsx";
import { useSearchParams } from "react-router-dom";
import Stage from "../components/Stage.tsx";
import { useState } from "react";

const HomePage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

  if (isMobile) {
    return (
      <Flex direction={"column"} bg={"black"} h="100vh" w="100vw">
        <Box mt={4} mx={2}>
          <RightPanel />
        </Box>
        <Box h={"50vh"} w={"100vw"} position="relative">
          {currentScene ? (
            <Stage isMobile={true} />
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
        <Box mb={4} mx={2}>
          <LeftPanel
            hoveredEpisode={hoveredEpisode}
            setHoveredEpisode={setHoveredEpisode}
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
        <LeftPanel
          hoveredEpisode={hoveredEpisode}
          setHoveredEpisode={setHoveredEpisode}
        />
      </Box>
      <Spacer />
      <Box zIndex={1}>
        <RightPanel />
      </Box>
    </Flex>
  );
};

export default HomePage;
