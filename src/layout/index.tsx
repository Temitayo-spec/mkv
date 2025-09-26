'use client';
import { Navbar, Sidebar } from '@/components';
import { Provider } from '@/components/ui/provider';
import { Box, HStack, VStack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';

const OverallLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Provider>
      <HStack align="flex-start" bg="bg.1" gap={0} w="100%" overflow={'hidden'} h={'100vh'}>
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
        <VStack w="100%" flex={1} align='flex-start'>
          <Navbar />
          <Box flex={1} w="100%">{children}</Box>
        </VStack>
      </HStack>
    </Provider>
  );
};

export default OverallLayout;
