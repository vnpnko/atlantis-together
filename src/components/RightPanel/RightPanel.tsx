import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import VideoComponent from "./VideoComponent.tsx";
import RightBox from "./RightBox.tsx";
import iframeKialo from "../../assets/images/iframe_kialo.png";
import iframeBetterWorldTogether from "../../assets/images/iframe_betterworldtogether.png";

interface RightPanelProps {
  onBoxClick: (contentUrl: string) => void;
  onCloseOverlay: () => void;
  findSource: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ onBoxClick }) => {
  return (
    <VStack
      width="400px"
      h="660px"
      position="relative"
      justify="space-between"
      zIndex={1}
    >
      <Box h="200px" w="full">
        <VideoComponent />
      </Box>

      <Box h="200px" w="full">
        <RightBox
          imageSrc={iframeBetterWorldTogether}
          onOpen={() =>
            onBoxClick(
              "https://betterworldtogether.wixsite.com/mysite/copy-of-mauritania",
            )
          }
        />
      </Box>

      <Box h="200px" w="full">
        <RightBox
          imageSrc={iframeKialo}
          onOpen={() =>
            onBoxClick(
              "https://www.kialo.com/atlantis-was-an-existing-place-and-can-be-found-41721",
            )
          }
        />
      </Box>
    </VStack>
  );
};

export default RightPanel;
