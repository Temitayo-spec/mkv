'use client';

import { SimpleGrid } from "@chakra-ui/react";
import { KanbanColumn } from "./KanbanColumn";

export const KanbanBoard: React.FC<{
  tasks: Task[];
  onEdit: (task: Task) => void;
  onAddTask: (status: Task['status']) => void;
}> = ({ tasks, onEdit, onAddTask }) => {
  const statuses: Task['status'][] = ['To Do', 'In Progress', 'Complete'];

  const getTasksByStatus = (status: Task['status']) =>
    tasks.filter((task) => task.status === status);

  return (
    <SimpleGrid
      columns={3}
      gap="1.56rem"
      w="full"
      px="1.25rem"
      alignItems="start"
    >
      {statuses.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={getTasksByStatus(status)}
          onEdit={onEdit}
          onAddTask={onAddTask}
        />
      ))}
    </SimpleGrid>
  );
};
