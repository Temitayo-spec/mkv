import { Box, Flex, IconButton } from '@chakra-ui/react';
import { ArrowLeft } from 'iconsax-reactjs';
import Image from 'next/image';
import React, { FC } from 'react';
import logo from '@/svgs/logo.svg';

const SidebarHeader: FC<{
  isCollapsed: boolean;
  onToggle: () => void;
}> = ({ isCollapsed, onToggle }) => {
  return (
    <Flex align="center" justify="space-between" p={4} pt="0.75rem">
      {!isCollapsed && (
        <Box>
          <Image src={logo} alt="mkv logo" />
        </Box>
      )}
      <IconButton
        aria-label="Toggle sidebar"
        size="sm"
        variant="ghost"
        onClick={onToggle}
        transform={isCollapsed ? 'rotate(180deg)' : 'none'}
        transition="transform 0.3s ease"
      >
        <ArrowLeft size={18} color="#1A1C1E" />
      </IconButton>
    </Flex>
  );
};

export default SidebarHeader;
