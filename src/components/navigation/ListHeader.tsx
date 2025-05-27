import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  resetIframe: () => void;
}
export const ListHeader = ({ resetIframe }: Props) => {
  const navigate = useNavigate();

  return (
    <Text
      fontSize="xl"
      fontWeight="bold"
      justifySelf={"center"}
      alignSelf={"center"}
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
