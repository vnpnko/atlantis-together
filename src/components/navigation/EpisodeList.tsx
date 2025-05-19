import { VStack } from "@chakra-ui/react";
import CustomButton from "../ui/CustomButton.tsx";
import locationsData from "../../assets/data/locations.json";
import { GlobeLocation } from "../../models/globe/GlobeLocation.ts";
import { useNavigate } from "react-router-dom";
import React from "react";

interface EpisodeListProps {
  current: string | null;
  hovered: string | null;
  setHovered: (e: string | null) => void;
}

export const EpisodeList: React.FC<EpisodeListProps> = ({
  current,
  hovered,
  setHovered,
}) => {
  const episodes = locationsData as GlobeLocation[];

  const navigate = useNavigate();

  const handleSceneChange = (sceneId: string) => {
    navigate(`/?scene=${sceneId}`);
  };

  return (
    <VStack spacing={3} p={2} overflowY="auto">
      {episodes.map(({ label }) => (
        <CustomButton
          key={label}
          label={label}
          isActive={current === label}
          isHovered={hovered === label}
          onClick={() => handleSceneChange(label)}
          onMouseEnter={() => setHovered(label)}
          onMouseLeave={() => setHovered(null)}
          justifyContent="flex-start"
        />
      ))}
    </VStack>
  );
};
