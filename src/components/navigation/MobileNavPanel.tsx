import React, { useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { ListHeader } from "./ListHeader.tsx";
import { EpisodeList } from "./EpisodeList.tsx";

interface MobileNavPanelProps {
  hoveredEpisode: string | null;
  setHoveredEpisode: (episode: string | null) => void;
  setIframeContent: (url: string) => void;
}

const MobileNavPanel: React.FC<MobileNavPanelProps> = ({
  hoveredEpisode,
  setHoveredEpisode,
  setIframeContent,
}) => {
  const [searchParams] = useSearchParams();
  const currentScene = searchParams.get("scene");

  const minHeight = 100;
  const maxHeight = window.innerHeight * 0.5;

  const [height, setHeight] = useState<number>(minHeight);
  const startYRef = useRef<number | null>(null);
  const startHeightRef = useRef<number>(minHeight);

  const handlePointerDown = (e: React.PointerEvent) => {
    startYRef.current = e.clientY;
    startHeightRef.current = height;
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (startYRef.current === null) return;
    const delta = startYRef.current - e.clientY;
    const nextHeight = Math.min(
      Math.max(startHeightRef.current + delta, minHeight),
      maxHeight,
    );
    setHeight(nextHeight);
  };

  const onPointerUp = () => {
    if (startYRef.current === null) return;
    const halfway = (maxHeight + minHeight) / 2;
    setHeight((prev) => (prev >= halfway ? maxHeight : minHeight));

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    startYRef.current = null;
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      w="full"
      h={`${height}px`}
      bg="black"
      borderTop="2px solid"
      borderColor="yellow.500"
      zIndex={20}
      overflowY="auto"
      style={{ touchAction: "none" }}
    >
      <Box
        w="50px"
        h="4px"
        bg="yellow.500"
        borderRadius="full"
        mx="auto"
        my={2}
        cursor="grab"
        onPointerDown={handlePointerDown}
      />
      <ListHeader resetIframe={() => setIframeContent("")} />

      <EpisodeList
        current={currentScene}
        hovered={hoveredEpisode}
        setHovered={setHoveredEpisode}
      />
    </Box>
  );
};

export default MobileNavPanel;
