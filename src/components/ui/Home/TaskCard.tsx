'use client';
import {
  Avatar,
  AvatarGroup,
  VStack,
  HStack,
  Text,
  Card,
} from '@chakra-ui/react';

import { Calendar, Flag, ProfileCircle } from 'iconsax-reactjs';
import { PRIORITY_COLORS } from '@/constants/task-management';

export const TaskCard: React.FC<{
  task: Task;
  onEdit: (task: Task) => void;
}> = ({ task, onEdit }) => (
  <Card.Root
    bg="white"
    _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
    transition="all 0.2s"
    cursor="pointer"
    onClick={() => onEdit(task)}
    w="100%"
    border="none"
    rounded="0.625rem"
  >
    <Card.Body p={4}>
      <VStack align="start" gap={3}>
        <Text fontWeight="semibold" fontSize="sm">
          {task.name}
        </Text>

        <HStack fontSize="xs" color="gray.500">
          <Calendar size={16} color="#BAC1CC" />
          <Text>
            {task.startDate} - {task.endDate}
          </Text>
        </HStack>

        <VStack justify="space-between" w="full" align="flex-start">
          <HStack>
            <ProfileCircle size={16} color="#BAC1CC" />
            <AvatarGroup size="xs">
              {task.assignees.map((user) => (
                <Avatar.Root key={user.id} size="xs">
                  <Avatar.Image src={user.avatar} />
                  <Avatar.Fallback name={user.name} />
                </Avatar.Root>
              ))}
            </AvatarGroup>
          </HStack>

          <HStack>
            <Flag
              size={18}
              color={PRIORITY_COLORS[task.priority]}
              variant="Bold"
            />
            <Text fontSize="sm" color="icons.2">
              {task.priority}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Card.Body>
  </Card.Root>
);
