import { FC } from 'react';
import { Box, Input } from '@chakra-ui/react';

import { CloseCircle, SearchNormal1 } from 'iconsax-reactjs';

export const SearchBox: FC = () => (
  <Box w={'13.75rem'} position="relative">
    <SearchNormal1
      size={18}
      color="#6C7278"
      style={{
        position: 'absolute',
        top: '50%',
        left: '0.88rem',
        transform: 'translateY(-50%)',
        zIndex: 1,
      }}
    />

    <Input
      placeholder="M91"
      p="0.88rem"
      pl="2.69rem"
      borderRadius={'0.625rem'}
      borderWidth="1px"
      borderColor="#CDD6E9"
      color="#1A1C1E"
      bg="#F7F7F7"
    />

    <CloseCircle
      size={18}
      color="#6C7278"
      style={{
        position: 'absolute',
        top: '50%',
        right: '0.88rem',
        transform: 'translateY(-50%)',
        zIndex: 1,
        cursor: 'pointer',
      }}
    />
  </Box>
);
