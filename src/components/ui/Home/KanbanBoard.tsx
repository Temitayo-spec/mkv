'use client';

import { SimpleGrid, Box } from '@chakra-ui/react';
import { KanbanColumn } from './KanbanColumn';
import {} from 'iconsax-reactjs';
import { STATUS_CONFIG } from '@/constants/task-management';

export const KanbanBoard: React.FC<{
  tasks: Task[];
  onEdit: (task: Task) => void;
  onAddTask: (status: Task['status']) => void;
}> = ({ tasks, onEdit, onAddTask }) => {
  const tasksByStatus = {
    'To Do': tasks.filter((task) => task.status === 'To Do'),
    'In Progress': tasks.filter((task) => task.status === 'In Progress'),
    Complete: tasks.filter((task) => task.status === 'Complete'),
  };

  return (
    <SimpleGrid
      columns={3}
      gap="1.56rem"
      w="full"
      px="1.25rem"
      alignItems="start"
    >
      {Object.entries(STATUS_CONFIG).map(([status]) => (
        <Box key={status} _hover={{ shadow: 'sm' }} transition="all 0.2s" w="100%" flex={1}>
          <KanbanColumn
            status={status as Task['status']}
            tasks={tasksByStatus[status as keyof typeof tasksByStatus]}
            onEdit={onEdit}
            onAddTask={onAddTask}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
