import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface CustomIframeProps extends BoxProps {
  src: string;
}

const DesktopIframe: React.FC<CustomIframeProps> = ({ src }) => {
  const isWixsite = src.includes("wixsite");

  return (
    <Box
      style={
        isWixsite
          ? {
              zoom: 0.6,
            }
          : undefined
      }
      overflow={"hidden"}
      width="100%"
      height="100%"
      as="iframe"
      sandbox="allow-scripts allow-same-origin"
      src={src}
      color={"black"}
    />
  );
};

export default DesktopIframe;
