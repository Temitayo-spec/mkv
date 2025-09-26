import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { mockTasks, mockUsers } from '@/constants/task-management';

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: mockTasks,

      addTask: (newTask) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...newTask,
              id: Date.now().toString(),
              assignees:
                newTask.assignees.length > 0
                  ? newTask.assignees
                  : [mockUsers[0]],
            },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      markTaskCompleted: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, status: 'Complete' as Task['status'] }
              : task
          ),
        })),

      markTaskIncomplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, status: 'To Do' as Task['status'] }
              : task
          ),
        })),

      toggleTaskStatus: (id) => {
        const task = get().tasks.find((t) => t.id === id);
        if (task) {
          const newStatus = task.status === 'Complete' ? 'To Do' : 'Complete';
          get().updateTask(id, { status: newStatus });
        }
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState) => {
        return persistedState as TaskState;
      },
    }
  )
);

export const useTasks = () => useTaskStore((state) => state.tasks);
export const useTaskActions = () =>
  useTaskStore(
    useShallow((state) => ({
      addTask: state.addTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask,
      markTaskCompleted: state.markTaskCompleted,
      markTaskIncomplete: state.markTaskIncomplete,
      toggleTaskStatus: state.toggleTaskStatus,
    }))
  );
