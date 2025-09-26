'use client';
import {
  Avatar,
  AvatarGroup,
  VStack,
  HStack,
  Text,
  Card,
  IconButton,
  Menu,
  Box,
} from '@chakra-ui/react';

import {
  Calendar,
  Flag,
  ProfileCircle,
  TickCircle,
  More,
  Edit2,
  Trash,
} from 'iconsax-reactjs';
import { PRIORITY_COLORS } from '@/constants/task-management';
import { useTaskActions } from '@/store/task-store';

export const TaskCard: React.FC<{
  task: Task;
  onEdit: (task: Task) => void;
}> = ({ task, onEdit }) => {
  const { toggleTaskStatus, deleteTask } = useTaskActions();

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskStatus(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const isCompleted = task.status === 'Complete';

  return (
    <Card.Root
      bg="white"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
      transition="all 0.2s"
      cursor="pointer"
      onClick={() => onEdit(task)}
      w="100%"
      border="none"
      rounded="0.625rem"
      opacity={isCompleted ? 0.7 : 1}
      position="relative"
    >
      <IconButton
        aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        position="absolute"
        top="0.5rem"
        right="0.5rem"
        size="sm"
        variant="ghost"
        onClick={handleToggleComplete}
        color={isCompleted ? '#75C5C1' : '#BAC1CC'}
        _hover={{
          color: isCompleted ? '#5BA9A5' : '#75C5C1',
          bg: 'rgba(117, 197, 193, 0.1)',
        }}
        zIndex={2}
      >
        <TickCircle size={20} variant={isCompleted ? 'Bold' : 'Outline'} />
      </IconButton>

      <Box position="absolute" top="0.5rem" right="2.5rem" zIndex={2}>
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              aria-label="Task options"
              size="sm"
              variant="ghost"
              color="#BAC1CC"
              _hover={{ color: '#464B50', bg: 'rgba(70, 75, 80, 0.1)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <More size={16} />
            </IconButton>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content
              bg="white"
              borderRadius="0.5rem"
              p="0.25rem"
              minW="120px"
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.200"
              zIndex={1000}
            >
              <Menu.Item
                value="edit"
                onClick={handleEdit}
                p="0.5rem"
                borderRadius="0.25rem"
                _hover={{ bg: 'gray.50' }}
                fontSize="sm"
              >
                <HStack gap="0.5rem">
                  <Edit2 size={16} color="#464B50" />
                  <Text color="#464B50">Edit</Text>
                </HStack>
              </Menu.Item>
              <Menu.Item
                value="toggle"
                onClick={handleToggleComplete}
                p="0.5rem"
                borderRadius="0.25rem"
                _hover={{ bg: 'gray.50' }}
                fontSize="sm"
              >
                <HStack gap="0.5rem">
                  <TickCircle
                    size={16}
                    color={isCompleted ? '#F6BE38' : '#75C5C1'}
                    variant={isCompleted ? 'Outline' : 'Bold'}
                  />
                  <Text color="#464B50">
                    {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                  </Text>
                </HStack>
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item
                value="delete"
                onClick={handleDelete}
                p="0.5rem"
                borderRadius="0.25rem"
                _hover={{ bg: 'red.50' }}
                fontSize="sm"
              >
                <HStack gap="0.5rem">
                  <Trash size={16} color="#E53E3E" />
                  <Text color="#E53E3E">Delete</Text>
                </HStack>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Box>

      <Card.Body p={4} pr={16}>
        <VStack align="start" gap={3}>
          <Text
            fontWeight="semibold"
            fontSize="sm"
            color="#464B50"
            textDecoration={isCompleted ? 'line-through' : 'none'}
          >
            {task.name}
          </Text>

          <HStack fontSize="xs">
            <Calendar size={16} color="#BAC1CC" />
            <Text color="#464B50">
              {task.startDate} - {task.endDate}
            </Text>
          </HStack>

          <VStack justify="space-between" w="full" align="flex-start">
            <HStack>
              <ProfileCircle size={16} color="#BAC1CC" />
              <AvatarGroup size="xs">
                {task.assignees.map((user) => (
                  <Avatar.Root
                    key={user.id}
                    size="xs"
                    w="1.25rem"
                    h="1.25rem"
                    bg="transparent"
                    border="none"
                    opacity={isCompleted ? 0.6 : 1}
                  >
                    <Avatar.Image src={user.avatar} />
                    <Avatar.Fallback name={user.name} />
                  </Avatar.Root>
                ))}
              </AvatarGroup>
            </HStack>

            <HStack>
              <Flag
                size={18}
                color={isCompleted ? '#BAC1CC' : PRIORITY_COLORS[task.priority]}
                variant="Bold"
              />
              <Text fontSize="sm" color={isCompleted ? '#BAC1CC' : 'icons.2'}>
                {task.priority}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
