import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  resetIframe: () => void;
}

export const ListHeader = ({ resetIframe }: Props) => {
  const navigate = useNavigate();

  return (
    <Heading
      as="h1"
      size="lg"
      p={3}
      mb={4}
      textAlign="center"
      cursor="pointer"
      color="yellow.400"
      _hover={{ color: "yellow.500" }}
      onClick={() => {
        resetIframe();
        navigate("/");
      }}
    >
      Atlantis Together
    </Heading>
  );
};
