import React from "react";
import { BoxProps, Image } from "@chakra-ui/react";

interface CustomImageProps extends BoxProps {
  isOpen?: boolean;
  iframeContent: string;
}

const MobileImage: React.FC<CustomImageProps> = ({
  isOpen,
  iframeContent,
  ...boxProps
}) => {
  return (
    <Image
      src={iframeContent}
      alt="Custom Image"
      w="full"
      h="full"
      objectFit="cover"
      opacity={isOpen ? 1 : 0.4}
      {...boxProps}
    />
  );
};

export default MobileImage;
