'use client';

import { STATUS_CONFIG } from '@/constants/task-management';
import {
  Box,
  Button,
  Badge,
  IconButton,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Add } from 'iconsax-reactjs';
import { TaskCard } from './TaskCard';

export const KanbanColumn: React.FC<{
  status: Task['status'];
  tasks: Task[];
  onEdit: (task: Task) => void;
  onAddTask: (status: Task['status']) => void;
}> = ({ status, tasks, onEdit, onAddTask }) => {
  const config = STATUS_CONFIG[status];
  const IconComponent = config.icon;

  return (
    <Box bg="bg.1" borderRadius="0.375rem" overflow="hidden" h="auto">
      <HStack justify="space-between" bg={config.bg} p="0.63rem">
        <HStack>
          <HStack
            h="1.875rem"
            bg="white"
            borderRadius="0.375rem"
            p="0.31rem"
            gap="0.5rem"
          >
            <IconComponent variant="Bold" color={config.color} size={20} />
            <Text
              fontSize="sm"
              fontWeight="600"
              lineHeight="100%"
              letterSpacing="-0.0175rem"
              color="#464B50"
            >
              {status}
            </Text>
          </HStack>
          <Badge
            bg="white"
            rounded="0.375rem"
            w="1.875rem"
            h="1.875rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="#464B50"
          >
            ({tasks.length})
          </Badge>
        </HStack>
        <IconButton
          aria-label={`Add task to ${status}`}
          onClick={() => onAddTask(status)}
          bg="white"
          rounded="0.375rem"
          w="1.875rem"
          h="1.875rem"
          variant="ghost"
        >
          <Add color="#292D32" />
        </IconButton>
      </HStack>

      <Box p="0.31rem">
        <VStack gap="0.31rem">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
          <Button
            variant="ghost"
            w="full"
            onClick={() => onAddTask(status)}
            _hover={{ bg: 'gray.100' }}
            h="2.5rem"
            bg="white"
            gap="0.88rem"
            py="0.63rem"
            px="0.88rem"
            justifyContent="flex-start"
            color="#464B50"
          >
            <Add size={20} />
            <Text fontSize="sm" fontWeight="500">Add Task</Text>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
