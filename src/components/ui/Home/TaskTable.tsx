'use client';
import { PRIORITY_COLORS } from '@/constants/task-management';
import {
  Table,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  HStack,
  Text,
  Portal,
} from '@chakra-ui/react';

import { Flag, More } from 'iconsax-reactjs';

export const TaskTable: React.FC<{
  tasks: Task[];
  onEditTask: (task: Task) => void;
}> = ({ tasks, onEditTask }) => (
  <Table.ScrollArea
    borderWidth="1px"
    borderRadius="0.625rem 0.625rem 0 0"
    height="350px"
    borderColor="strokes.1"
  >
    <Table.Root
      variant="line"
      bg="white"
      rounded="xl"
      w="100%"
      stickyHeader
      interactive
    >
      <Table.Header>
        <Table.Row bg="bg.1" h="4.5rem">
          <Table.ColumnHeader
            px="2.5rem"
            borderRight="0.125rem solid rgba(205, 214, 233, 0.60)"
            color="text.black_1"
          >
            Name
          </Table.ColumnHeader>
          <Table.ColumnHeader
            px="0.88rem"
            borderRight="0.125rem solid rgba(205, 214, 233, 0.60)"
            color="text.black_1"
          >
            Date
          </Table.ColumnHeader>
          <Table.ColumnHeader
            px="0.88rem"
            borderRight="0.125rem solid rgba(205, 214, 233, 0.60)"
            color="text.black_1"
          >
            Assignee
          </Table.ColumnHeader>
          <Table.ColumnHeader px="0.88rem" color="text.black_1">
            Priority
          </Table.ColumnHeader>
          <Table.ColumnHeader
            px="0.88rem"
            color="text.black_1"
          ></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks.map((task) => (
          <Table.Row
            key={task.id}
            bg="white"
            _hover={{ bg: 'gray.50' }}
            h="5rem"
          >
            <Table.Cell
              pl="2.5rem"
              fontWeight="600"
              fontSize="sm"
              color="icons.2"
              borderColor="#CDD6E9"
            >
              {task.name}
            </Table.Cell>
            <Table.Cell
              fontWeight="600"
              fontSize="sm"
              color="icons.2"
              px="0.88rem"
              borderColor="#CDD6E9"
            >
              {task.startDate} - {task.endDate}
            </Table.Cell>
            <Table.Cell borderColor="#CDD6E9">
              <AvatarGroup size="sm">
                {task.assignees.map((user) => (
                  <Avatar.Root
                    key={user.id}
                    w="1.25rem"
                    h="1.25rem"
                    bg="transparent"
                    border="none"
                  >
                    <Avatar.Image src={user.avatar} />
                    <Avatar.Fallback name={user.name} fontSize="xs" />
                  </Avatar.Root>
                ))}
              </AvatarGroup>
            </Table.Cell>
            <Table.Cell borderColor="#CDD6E9">
              <HStack gap="0.87rem">
                <Flag
                  color={PRIORITY_COLORS[task.priority]}
                  size={18}
                  variant="Bold"
                />
                <Text fontSize="sm" color="icons.2">
                  {task.priority}
                </Text>
              </HStack>
            </Table.Cell>
            <Table.Cell borderColor="#CDD6E9">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <IconButton
                    aria-label="Options"
                    variant="ghost"
                    bg="bg.1"
                    h="1.875rem"
                    w="2.5rem"
                    color="#6C7278"
                  >
                    <More />
                  </IconButton>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content bg="bg.1">
                      <Menu.Item
                        value="edit"
                        onSelect={() => onEditTask(task)}
                        p="0.5rem"
                        color="icons.1"
                        fontSize="sm"
                        fontWeight="600"
                        bg="bg.1"
                        _hover={{ bg: 'gray.50' }}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        value="delete"
                        p="0.5rem"
                        color="icons.1"
                        fontSize="sm"
                        bg="bg.1"
                        fontWeight="600"
                        _hover={{ bg: 'gray.50' }}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </Table.ScrollArea>
);
