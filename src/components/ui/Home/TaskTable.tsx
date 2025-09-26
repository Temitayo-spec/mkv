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

import { Flag, More, TickCircle, Edit2, Trash } from 'iconsax-reactjs';
import { useTaskActions } from '@/store/task-store';

export const TaskTable: React.FC<{
  tasks: Task[];
  onEditTask: (task: Task) => void;
}> = ({ tasks, onEditTask }) => {
  const { toggleTaskStatus, deleteTask } = useTaskActions();

  const handleToggleComplete = (taskId: string) => {
    // e.stopPropagation();
    toggleTaskStatus(taskId);
  };

  const handleEdit = (task: Task) => {
    // e.stopPropagation();
    onEditTask(task);
  };

  const handleDelete = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  return (
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
              px="2rem"
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
          {tasks.map((task) => {
            const isCompleted = task.status === 'Complete';
            return (
              <Table.Row
                key={task.id}
                bg="white"
                _hover={{ bg: 'gray.50' }}
                h="5rem"
                opacity={isCompleted ? 0.7 : 1}
              >
                <Table.Cell
                  pl="2rem"
                  fontWeight="600"
                  fontSize="sm"
                  color="icons.2"
                  borderColor="#CDD6E9"
                  textDecoration={isCompleted ? 'line-through' : 'none'}
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
                        opacity={isCompleted ? 0.6 : 1}
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
                      color={
                        isCompleted ? '#BAC1CC' : PRIORITY_COLORS[task.priority]
                      }
                      size={18}
                      variant="Bold"
                    />
                    <Text
                      fontSize="sm"
                      color={isCompleted ? '#BAC1CC' : 'icons.2'}
                    >
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
                        <Menu.Content
                          bg="white"
                          borderRadius="0.5rem"
                          boxShadow="lg"
                        >
                          <Menu.Item
                            value="edit"
                            onSelect={() => handleEdit(task)}
                            p="0.5rem"
                            color="icons.1"
                            fontSize="sm"
                            fontWeight="600"
                            bg="white"
                            _hover={{ bg: 'gray.50' }}
                          >
                            <HStack gap="0.5rem">
                              <Edit2 size={16} />
                              <Text>Edit</Text>
                            </HStack>
                          </Menu.Item>
                          <Menu.Item
                            value="toggle"
                            onSelect={() => handleToggleComplete(task.id)}
                            p="0.5rem"
                            color="icons.1"
                            fontSize="sm"
                            fontWeight="600"
                            bg="white"
                            _hover={{ bg: 'gray.50' }}
                          >
                            <HStack gap="0.5rem">
                              <TickCircle
                                size={16}
                                variant={isCompleted ? 'Outline' : 'Bold'}
                              />
                              <Text>
                                {isCompleted
                                  ? 'Mark Incomplete'
                                  : 'Mark Complete'}
                              </Text>
                            </HStack>
                          </Menu.Item>
                          <Menu.Separator />
                          <Menu.Item
                            value="delete"
                            onSelect={() => handleDelete(task.id)}
                            p="0.5rem"
                            color="#E53E3E"
                            fontSize="sm"
                            bg="white"
                            fontWeight="600"
                            _hover={{ bg: 'red.50' }}
                          >
                            <HStack gap="0.5rem">
                              <Trash size={16} />
                              <Text>Delete</Text>
                            </HStack>
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};
