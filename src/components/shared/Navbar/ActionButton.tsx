import { Button } from "@chakra-ui/react";

export const ActionButton: React.FC<{ label: string; bg: string }> = ({
  label,
  bg,
}) => (
  <Button
    bg={bg}
    color="white"
    borderRadius={'0.625rem'}
    fontWeight="bold"
    py="0.75rem"
    px="0.625rem"
    fontSize="sm"
    lineHeight="100%"
    letterSpacing="-0.0175rem"
    _hover={{ opacity: 0.9 }}
  >
    {label}
  </Button>
);