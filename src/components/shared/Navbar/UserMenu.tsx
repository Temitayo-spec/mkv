import { Avatar, Menu, HStack, Text, Portal } from '@chakra-ui/react';
import { ArrowDown2 } from 'iconsax-reactjs';

const menuItems = [
  { value: 'profile', label: 'Profile' },
  { value: 'settings', label: 'Settings' },
  { value: 'logout', label: 'Logout' },
];

export const UserMenu: React.FC = () => (
  <Menu.Root>
    <Menu.Trigger
      asChild
      _hover={{ bg: 'gray.100' }}
      _active={{ bg: 'gray.100' }}
      p="0.19rem"
      bg="bg.1"
      borderRadius="3.125rem"
      minW="8.375rem"
      pr="0.88rem"
      cursor="pointer"
    >
      <HStack gap={2} justify="space-between">
        <HStack>
          <Avatar.Root>
            <Avatar.Fallback name="Paul" />
            <Avatar.Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              w={'2.5rem'}
              h={'2.5rem'}
            />
          </Avatar.Root>

          <Text
            fontWeight="semibold"
            color="bg.500"
            lineHeight="140%"
            letterSpacing="-0.0175rem"
            fontSize="sm"
          >
            Hi Paul
          </Text>
        </HStack>

        <ArrowDown2 size="14" color="#6C7278" variant="Bold" />
      </HStack>
    </Menu.Trigger>

    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          {menuItems.map(({ value, label }) => (
            <Menu.Item key={value} value={value} p="0.5rem" cursor="pointer">
              {label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);
