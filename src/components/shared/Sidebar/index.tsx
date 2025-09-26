'use client';
import React, { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { menuItems } from '@/constants/sidebar-menu';
import { SidebarItem } from './SidebarItem';
import ThemeToogle from './ThemeToogle';
import LanguageSelect from './LanguageSelect';
import SidebarHeader from './SidebarHeader';

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const [activeItem, setActiveItem] = useState<string>('to-do');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(['my-department'])
  );

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    console.log(`Navigating to: ${id}`);
  };

  const handleToggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Box
      h="100vh"
      w={isCollapsed ? '5rem' : '15.625rem'}
      bg="white"
      borderRight="1px"
      borderColor="#CDD6E9"
      transition="width 0.25s ease"
      position="relative"
      overflow="hidden"
      flexShrink={0}
    >
      <VStack gap={0} align="stretch" h="full">
        <SidebarHeader isCollapsed={isCollapsed} onToggle={onToggle!} />

        <Box flex={1} overflowY="auto" p={2}>
          <VStack gap={1} align="stretch">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                isCollapsed={isCollapsed}
                onClick={() => handleItemClick(item.id)}
                isOpen={openItems.has(item.id)}
                onToggle={() => handleToggleItem(item.id)}
                activeItem={activeItem}
                onItemClick={handleItemClick}
              />
            ))}
          </VStack>
        </Box>

        {!isCollapsed && (
          <Box
            py={'0.625rem'}
            px={'0.875rem'}
            h={'5.625rem'}
            w={'11.875rem'}
            borderRadius={'0.625rem'}
            border={'1px solid #CDD6E9'}
            bg={'#F7F7F7'}
            mx={'auto'}
            my={'1.25rem'}
          >
            <VStack gap={3} align="stretch">
              <LanguageSelect />

              <ThemeToogle isDark={isDark} setIsDark={setIsDark} />
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Sidebar;
