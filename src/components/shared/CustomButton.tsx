import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  isActive?: boolean;
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  isActive,
  label,
  onClick,
  ...props
}) => {
  return (
    <Button
      width="full"
      p={4}
      borderRadius="md"
      fontSize="lg"
      fontWeight={700}
      color={"black"}
      _hover={{
        bgColor: isActive ? "yellow.700" : "yellow.600",
      }}
      bgColor={isActive ? "yellow.700" : "yellow.500"}
      onClick={onClick}
      {...props}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
