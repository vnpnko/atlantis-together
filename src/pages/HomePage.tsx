import { Box, Flex, Spacer } from "@chakra-ui/react";
import LeftPanel from "../components/LeftPanel/LeftPanel.tsx";
import RightPanel from "../components/RightPanel/RightPanel.tsx";
import MyGlobe from "../components/MyGlobe.tsx";
import Stage from "../components/Stage.tsx";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

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
      <Spacer />
      <Box zIndex={1}>
        <RightPanel />
      </Box>
    </Flex>
  );
};

export default HomePage;
