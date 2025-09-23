import { HStack, Switch, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

const ThemeToogle: FC<{
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isDark, setIsDark }) => {
  return (
    <HStack
      gap={2}
      bg="white"
      py="0.31rem"
      px="0.625rem"
      w="100%"
      borderRadius={'0.375rem'}
      justify="space-between"
      cursor={'pointer'}
    >
      <Text
        fontSize="xs"
        fontWeight="semibold"
        lineHeight={'140%'}
        letterSpacing={'-0.015rem'}
        color={'#6C7278'}
      >
        Dark mode
      </Text>
      <Switch.Root
        checked={isDark}
        onCheckedChange={(details) => setIsDark(details.checked)}
        size="sm"
        colorScheme="blue"
        aria-label="Dark mode toggle"
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </HStack>
  );
};

export default ThemeToogle;
