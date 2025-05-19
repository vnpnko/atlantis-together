import React from "react";
import { useSearchParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import MyGlobe from "../MyGlobe.tsx";
import { ListHeader } from "./ListHeader.tsx";
import { EpisodeList } from "./EpisodeList.tsx";

interface DesktopNavPanelProps {
  hoveredEpisode: string | null;
  setHoveredEpisode: (episode: string | null) => void;
  setIframeContent: (url: string) => void;
}

const DesktopNavPanel: React.FC<DesktopNavPanelProps> = ({
  hoveredEpisode,
  setHoveredEpisode,
  setIframeContent,
}) => {
  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

  return (
    <Box
      w={window.innerWidth * 0.25}
      h={"100%"}
      p={4}
      bg="black"
      border="2px"
      borderRadius="lg"
      borderColor="yellow.500"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <ListHeader resetIframe={() => setIframeContent("")} />

      {currentScene && (
        <Box
          display="flex"
          justifyContent="center"
          borderRadius="md"
          overflow="hidden"
        >
          <MyGlobe
            width={window.innerWidth}
            height={window.innerHeight * 0.3}
            bgColor={true}
            hoveredEpisode={hoveredEpisode}
            setHoveredEpisode={setHoveredEpisode}
          />
        </Box>
      )}

      <EpisodeList
        current={currentScene}
        hovered={hoveredEpisode}
        setHovered={setHoveredEpisode}
      />
    </Box>
  );
};

export default DesktopNavPanel;
