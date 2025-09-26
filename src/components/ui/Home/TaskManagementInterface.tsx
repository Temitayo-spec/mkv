'use client';
import React, { useState, useMemo } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Input,
  Badge,
  IconButton,
  HStack,
  Text,
  Tabs,
} from '@chakra-ui/react';

import {
  SearchNormal1,
  Calendar,
  ArrowCircleLeft2,
  Sort,
  ExportCurve,
  AddCircle,
  RowHorizontal,
  RowVertical,
  TaskSquare,
} from 'iconsax-reactjs';
import { mockTasks, STATUS_CONFIG } from '@/constants/task-management';
import { TaskTable } from './TaskTable';
import { CustomPagination } from './CustomPagination';
import { KanbanBoard } from './KanbanBoard';
import { AddTaskModal } from './AddTaskModal';

export const TaskManagementInterface: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [selectedStatus, setSelectedStatus] = useState<'all' | Task['status']>(
    'all'
  );
  const [defaultTaskStatus, setDefaultTaskStatus] =
    useState<Task['status']>('To Do');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((task) => task.status === selectedStatus);
    }

    return filtered;
  }, [tasks, searchQuery, selectedStatus]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage, pageSize]);

  const taskCounts = useMemo(() => {
    return {
      'To Do': tasks.filter((t) => t.status === 'To Do').length,
      'In Progress': tasks.filter((t) => t.status === 'In Progress').length,
      Complete: tasks.filter((t) => t.status === 'Complete').length,
    };
  }, [tasks]);

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
  };

  const handleEditTask = (task: Task) => {
    console.log('Edit task:', task);
  };

  const handleAddTaskWithStatus = (status: Task['status']) => {
    setDefaultTaskStatus(status);
    setIsModalOpen(true);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    console.log('Export to Excel');
  };

  return (
    <Box bg="white" borderRadius="0.625rem" w="100%" maxW="1200px" pb="1rem">
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        p="1.25rem"
        pb="1rem"
        borderBottom="1px solid #CDD6E9"
      >
        <HStack gap="1.87rem">
          <IconButton
            aria-label="Back"
            variant="ghost"
            rounded="full"
            p="0.625rem"
            w="2.875rem"
            h="2.875rem"
            borderWidth="1px"
            borderColor="strokes.1"
            color="#464B50"
          >
            <ArrowCircleLeft2 size="1.625rem" />
          </IconButton>
          <Heading
            fontSize="1.875rem"
            fontWeight="bold"
            lineHeight="100%"
            letterSpacing="-0.0375rem"
            color="text.black_1"
          >
            Afdeling Kwaliteit
          </Heading>
        </HStack>

        <HStack>
          <IconButton
            variant="plain"
            bg="bg.1"
            w="3.125rem"
            h="3.125rem"
            borderRadius="0.625rem"
            borderWidth="1px"
            borderColor="rgba(205, 214, 233, 0.20)"
          >
            <Sort color="#292D32" />
          </IconButton>
          <IconButton
            variant="plain"
            bg="bg.1"
            w="3.125rem"
            h="3.125rem"
            borderRadius="0.625rem"
            borderWidth="1px"
            borderColor="rgba(205, 214, 233, 0.20)"
          >
            <Calendar color="#292D32" />
          </IconButton>
          <Button
            variant="solid"
            bg="bg.indigo"
            onClick={exportToExcel}
            py="0.81rem"
            px="1.25rem"
            borderRadius="0.625rem"
            fontWeight="600"
            color="white"
          >
            <ExportCurve />
            Export xlsx
          </Button>
          <Button
            bg="bg.aqua_blue"
            variant="solid"
            onClick={() => setIsModalOpen(true)}
            py="0.81rem"
            px="1.25rem"
            borderRadius="0.625rem"
            fontWeight="600"
            color="white"
          >
            <AddCircle />
            Add Task
          </Button>
        </HStack>
      </Flex>

      <Flex
        justify="space-between"
        align="center"
        m="1.25rem"
        p="0.63rem"
        bg="bg.aqua_blue_50"
        borderRadius="0.375rem"
      >
        <Box position="relative" flex={1}>
          <SearchNormal1
            size={18}
            color="#6C7278"
            style={{
              position: 'absolute',
              top: '50%',
              left: '0.88rem',
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          />
          <Input
            placeholder="Search for To-Do"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            p="0.5rem 0.625rem"
            pl="2.75rem"
            maxW="18.75rem"
            w="100%"
            bg="white"
            border="0"
          />
        </Box>

        <HStack gap="0.25rem" bg="white" p="0.37rem" borderRadius="0.375rem">
          <Button
            onClick={() => setViewMode('list')}
            p="0.25rem"
            bg={viewMode === 'list' ? 'bg.aqua_blue' : '#F7F7F7'}
            color={viewMode === 'list' ? 'white' : '#7988A9'}
          >
            <RowHorizontal />
          </Button>
          <Button
            onClick={() => setViewMode('kanban')}
            p="0.25rem"
            bg={viewMode === 'kanban' ? 'bg.aqua_blue' : '#F7F7F7'}
            color={viewMode === 'kanban' ? 'white' : '#7988A9'}
          >
            <RowVertical />
          </Button>
        </HStack>
      </Flex>

      {viewMode === 'list' && (
        <Tabs.Root
          value={selectedStatus === 'all' ? 'all' : selectedStatus}
          onValueChange={(e) => {
            setSelectedStatus(e.value as 'all' | Task['status']);
          }}
          bg="bg.1"
          p="0.62rem"
          m="1.25rem"
          variant="plain"
          borderRadius="0.375rem"
          mb="0.625rem"
        >
          <Tabs.List
            border={0}
            display="flex"
            gap="0.625rem"
            alignItems="center"
          >
            <Tabs.Trigger
              value="all"
              bg={selectedStatus === 'all' ? '#CFB7E8' : 'white'}
              py="0.5rem"
              px="0.625rem"
              borderRadius="0.375rem"
              w="11rem"
            >
              <HStack justify="space-between" w="100%">
                <HStack gap="0.62rem">
                  <TaskSquare
                    variant="Bold"
                    color={selectedStatus === 'all' ? 'white' : '#CFB7E8'}
                    size={20}
                  />
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    lineHeight="100%"
                    letterSpacing="-0.0175rem"
                    color={selectedStatus === 'all' ? 'white' : 'icons.2'}
                  >
                    All Tasks
                  </Text>
                </HStack>
                <Badge
                  bg="#F9F3FF"
                  rounded="0.375rem"
                  p="0.625rem"
                  h="2rem"
                  color="icons.2"
                  fontSize="sm"
                  letterSpacing="-0.0175rem"
                  fontWeight="500"
                  lineHeight="100%"
                >
                  ({tasks.length})
                </Badge>
              </HStack>
            </Tabs.Trigger>

            {Object.entries(STATUS_CONFIG).map(([status, config]) => {
              const IconComponent = config.icon;
              return (
                <Tabs.Trigger
                  key={status}
                  value={status}
                  bg={selectedStatus === status ? config.color : 'white'}
                  py="0.5rem"
                  px="0.625rem"
                  borderRadius="0.375rem"
                  w="11rem"
                >
                  <HStack justify="space-between" w="100%">
                    <HStack gap="0.62rem">
                      <IconComponent
                        variant="Bold"
                        color={
                          selectedStatus === status ? 'white' : config.color
                        }
                        size={20}
                      />
                      <Text
                        fontSize="sm"
                        fontWeight="500"
                        lineHeight="100%"
                        letterSpacing="-0.0175rem"
                        color={selectedStatus === status ? 'white' : 'icons.2'}
                      >
                        {status}
                      </Text>
                    </HStack>
                    <Badge
                      bg={config.bg}
                      rounded="0.375rem"
                      p="0.625rem"
                      h="2rem"
                      color="icons.2"
                      fontSize="sm"
                      letterSpacing="-0.0175rem"
                      fontWeight="500"
                      lineHeight="100%"
                    >
                      ({taskCounts[status as keyof typeof taskCounts]})
                    </Badge>
                  </HStack>
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>
        </Tabs.Root>
      )}

      {viewMode === 'list' ? (
        <Box p="1.25rem">
          <TaskTable tasks={paginatedTasks} onEditTask={handleEditTask} />
          <CustomPagination
            currentPage={currentPage}
            totalItems={filteredTasks.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      ) : (
        <KanbanBoard
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onAddTask={handleAddTaskWithStatus}
        />
      )}

      <AddTaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
        defaultStatus={defaultTaskStatus}
      />
    </Box>
  );
};
