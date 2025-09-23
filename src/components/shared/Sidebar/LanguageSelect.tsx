import { Box, HStack, Text } from '@chakra-ui/react';
import { ArrowDown2 } from 'iconsax-reactjs';
import Image from 'next/image';
import english from '@/svgs/english.svg';

const LanguageSelect = () => {
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
      <HStack borderRadius="sm" gap={'0.63rem'}>
        <Box borderRadius="100%" w="1.25rem" h="1.25rem">
          <Image src={english} alt="england symbol" />
        </Box>

        <Text
          fontSize="xs"
          fontWeight="semibold"
          lineHeight={'140%'}
          letterSpacing={'-0.015rem'}
          color={'#6C7278'}
        >
          English
        </Text>
      </HStack>

      <ArrowDown2 size={16} />
    </HStack>
  );
};

export default LanguageSelect;
