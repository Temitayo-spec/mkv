import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-reactjs';

export const SidebarItem: React.FC<{
  item: MenuItem;
  isActive?: boolean;
  isCollapsed?: boolean;
  level?: number;
  onClick?: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onItemClick?: (id: string) => void;
}> = ({
  item,
  isActive = false,
  isCollapsed = false,
  level = 0,
  onClick,
  isOpen = false,
  onToggle,
  activeItem,
  onItemClick,
}) => {
  const IconComponent = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren && !isCollapsed) {
      onToggle?.();
    } else {
      onClick?.();
    }
  };

  return (
    <Box>
      <HStack
        w="full"
        p={3}
        pl={level === 0 ? 4 : 8 + level * 4}
        gap={3}
        cursor="pointer"
        borderRadius="md"
        bg={isActive ? '#E9F5F7' : 'transparent'}
        color={isActive ? '#75C5C1' : 'gray.600'}
        _hover={{ bg: '#E9F5F7', color: '#75C5C1' }}
        transition="all 0.15s"
        onClick={handleClick}
      >
        {level === 0 && IconComponent && <IconComponent size={18} />}
        {!isCollapsed && (
          <>
            <Text
              fontSize="sm"
              fontWeight={'600'}
              flex={1}
              letterSpacing={'-0.0175rem'}
            >
              {item.label}
            </Text>
            {item.badge ? (
              <Badge colorScheme="red" borderRadius="full" px={2} py={0.5}>
                {item.badge}
              </Badge>
            ) : null}
            {hasChildren && (
              <Box>
                {isOpen ? <ArrowUp2 size={16} /> : <ArrowDown2 size={16} />}
              </Box>
            )}
          </>
        )}
      </HStack>

      {hasChildren && isOpen && !isCollapsed && (
        <VStack gap={1} align="stretch" mt={1} mb={1}>
          {item.children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              isActive={activeItem === child.id}
              isCollapsed={isCollapsed}
              level={level + 1}
              onClick={() => onItemClick?.(child.id)}
            />
          ))}
        </VStack>
      )}

      {hasChildren && isCollapsed && (
        <VStack gap={1} align="stretch" mt={1}>
          {item.children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              isActive={activeItem === child.id}
              isCollapsed={isCollapsed}
              level={0}
              onClick={() => onItemClick?.(child.id)}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};
