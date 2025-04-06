import { Box, Flex, Spacer, useBreakpointValue } from "@chakra-ui/react";
import LeftPanel from "../components/LeftPanel/LeftPanel.tsx";
import RightPanel from "../components/RightPanel/RightPanel.tsx";
import MyGlobe from "../components/MyGlobe.tsx";
import { useSearchParams } from "react-router-dom";
import Stage from "../components/Stage.tsx";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Flex direction={"column"} bg={"black"} h="100vh" w="100vw">
        <Box mt={4} mx={2}>
          <RightPanel />
        </Box>
        <Box h={"50vh"} w={"100vw"} position="relative">
          {currentScene ? <Stage isMobile={true} /> : <MyGlobe />}
        </Box>
        <Box mb={4} mx={2}>
          <LeftPanel />
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
        {currentScene ? <Stage /> : <MyGlobe />}
      </Box>
      <Box zIndex={1}>
        <LeftPanel />
      </Box>
      <Spacer />
      <Box zIndex={1}>
        <RightPanel />
      </Box>
    </Flex>
  );
};

export default HomePage;
