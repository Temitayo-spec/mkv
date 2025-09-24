import { Box, IconButton } from '@chakra-ui/react';
import Image from 'next/image';

export const CompanyIcon: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <IconButton aria-label={alt} variant="plain">
    <Box
      w={'2.875rem'}
      h={'2.875rem'}
      borderRadius={'0.625rem'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderWidth="1px"
      borderColor="#EEF1F9"
    >
      <Image src={src} alt={alt} />
    </Box>
  </IconButton>
);
