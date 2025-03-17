import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Heading, VStack } from "@chakra-ui/react";
import MyGlobe from "../MyGlobe.tsx";
import CustomButton from "../shared/CustomButton.tsx";
import locationsData from "../../assets/data/locations.json";

interface GlobeLocation {
  lat: number;
  lng: number;
  label: string;
  url: string;
  source: string;
}

const locations: GlobeLocation[] = locationsData.map((location) => ({
  lat: location.lat,
  lng: location.lng,
  label: location.label,
  url: location.url,
  source: location.source,
}));

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

  const handleSceneChange = (sceneId: string) => {
    navigate(`/?scene=${sceneId}`);
  };

  return (
    <Box
      width="400px"
      h="660px"
      p={4}
      bg="black"
      zIndex={1}
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
          <MyGlobe width={365} height={250} bgColor={true} />
        </Box>
      )}
      {/* Scene Buttons List */}
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
};

export default LeftPanel;
