import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Heading, useBreakpointValue, VStack } from "@chakra-ui/react";
import MyGlobe from "../MyGlobe.tsx";
import CustomButton from "../shared/CustomButton.tsx";
import locationsData from "../../assets/data/locations.json";
import { GlobeLocation } from "../../models/globe/GlobeLocation.ts";

interface LeftPanelProps {
  hoveredEpisode: string | null;
  setHoveredEpisode: (episode: string | null) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  hoveredEpisode,
  setHoveredEpisode,
}) => {
  const locations = locationsData as GlobeLocation[];

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

  const handleSceneChange = (sceneId: string) => {
    navigate(`/?scene=${sceneId}`);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Box
        width="full"
        p={4}
        bg="black"
        border="2px"
        borderRadius="lg"
        borderColor="yellow.500"
        display="flex"
        flexDirection="column"
      >
        <Heading
          as="h1"
          size="lg"
          p={3}
          mb={4}
          textAlign="center"
          cursor="pointer"
          color={"yellow.500"}
          _hover={{ color: "yellow.700" }}
          onClick={() => navigate("/")}
        >
          Atlantis Together
        </Heading>
        {currentScene && (
          <Box
            mb={4}
            display="flex"
            justifyContent="center"
            borderRadius="md"
            overflow="hidden"
          >
            <MyGlobe
              width={365}
              height={250}
              bgColor={true}
              hoveredEpisode={hoveredEpisode}
              setHoveredEpisode={setHoveredEpisode}
            />
          </Box>
        )}
        <VStack spacing={3} pr={2} flex="1" overflowY="auto">
          {locations.map(({ label }) => (
            <CustomButton
              key={label}
              isActive={currentScene === label}
              label={label}
              onClick={() => handleSceneChange(label)}
              justifyContent="flex-start"
            />
          ))}
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      w="25vw"
      h="full"
      p={4}
      bg="black"
      border="2px"
      borderRadius="lg"
      borderColor="yellow.500"
      display="flex"
      flexDirection="column"
    >
      <Heading
        as="h1"
        size="lg"
        p={3}
        mb={4}
        textAlign="center"
        cursor="pointer"
        color={"yellow.400"}
        _hover={{ color: "yellow.500" }}
        onClick={() => navigate("/")}
      >
        Atlantis Together
      </Heading>
      {currentScene && (
        <Box
          mb={4}
          display="flex"
          justifyContent="center"
          borderRadius="md"
          overflow="hidden"
        >
          <MyGlobe
            width={365}
            height={250}
            bgColor={true}
            hoveredEpisode={hoveredEpisode}
            setHoveredEpisode={setHoveredEpisode}
          />
        </Box>
      )}
      <VStack spacing={3} pr={2} flex="1" overflowY="auto">
        {locations.map(({ label }) => (
          <CustomButton
            key={label}
            isActive={currentScene === label}
            isHovered={hoveredEpisode === label}
            label={label}
            onClick={() => handleSceneChange(label)}
            onMouseEnter={() => {
              setHoveredEpisode(label);
            }}
            onMouseLeave={() => {
              setHoveredEpisode(null);
            }}
            justifyContent="flex-start"
          />
        ))}
      </VStack>
    </Box>
  );
};

export default LeftPanel;
