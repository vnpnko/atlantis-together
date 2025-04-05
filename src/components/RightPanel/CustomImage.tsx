import React from "react";
import { BoxProps, Image } from "@chakra-ui/react";

interface CustomImageProps extends BoxProps {
  src: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, ...boxProps }) => {
  return (
    <Image
      src={src}
      alt="Custom Image"
      w="full"
      h="full"
      objectFit="cover"
      opacity={0.4}
      {...boxProps}
    />
  );
};

export default CustomImage;
