import React from "react";
import { useSearchParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const videoUrls: Record<string, string> = {
  default: "https://www.youtube.com/embed/9s6ASpJ2Crw",
  Mauritania: "https://www.youtube.com/embed/qBqVqm_DGU4",
  Athens: "https://www.youtube.com/embed/zyZAMR56mXY?start=1",
  Budapest: "https://www.youtube.com/embed/N0QblwXyXvo",
};

const VideoComponent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const scene = searchParams.get("scene") || "default";
  const videoUrl = videoUrls[scene] || videoUrls.default;

  return (
    <Box
      as="iframe"
      w="full"
      h="full"
      border="2px"
      borderRadius="lg"
      borderColor="yellow.500"
      src={videoUrl}
      allowFullScreen
    />
  );
};

export default VideoComponent;
