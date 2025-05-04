import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  isActive?: boolean;
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  return (
    <Button
      {...props}
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
