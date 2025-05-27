import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface Props {
  resetIframe: () => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerMove?: (e: React.PointerEvent) => void;
}
export const ListHeader = ({
  resetIframe,
  onPointerDown,
  onPointerMove,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Text
      fontSize="xl"
      fontWeight="bold"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      justifySelf={"center"}
      p={3}
      cursor="pointer"
      color="yellow.400"
      _hover={{ color: "yellow.500" }}
      onClick={() => {
        resetIframe();
        navigate("/");
      }}
    >
      Atlantis Together
    </Text>
  );
};
