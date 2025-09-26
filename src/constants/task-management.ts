import { createListCollection } from "@chakra-ui/react";
import { Status, TaskSquare, TickCircle } from "iconsax-reactjs";

const PRIORITY_COLORS = {
  Low: 'gray',
  Medium: '#75C5C1',
  Important: '#F6BE38',
  Urgent: '#FF515D',
} as const;

const STATUS_CONFIG = {
  'To Do': { icon: TaskSquare, color: '#CFB7E8', bg: '#F9F3FF' },
  'In Progress': { icon: Status, color: '#F6BE38', bg: '#FBF4E4' },
  Complete: { icon: TickCircle, color: '#75C5C1', bg: '#E9F5F7' },
} as const;

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', avatar: '/svgs/assignee.svg' },
  { id: '2', name: 'Jane Smith', avatar: '/svgs/assignee.svg' },
  { id: '3', name: 'Mike Johnson', avatar: '/svgs/assignee.svg' },
];

const mockTasks: Task[] = [
  {
    id: '1',
    name: 'MKV Intranet V2',
    startDate: '04/06/2024',
    endDate: '16/06/2024',
    assignees: [mockUsers[0], mockUsers[1]],
    priority: 'Medium',
    status: 'To Do',
  },
  {
    id: '2',
    name: 'Design System',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: [mockUsers[0], mockUsers[2]],
    priority: 'Important',
    status: 'To Do',
  },
  {
    id: '3',
    name: 'Medical Appointment',
    startDate: '16/06/2024',
    endDate: '18/06/2024',
    assignees: [mockUsers[1], mockUsers[2]],
    priority: 'Urgent',
    status: 'To Do',
  },
  {
    id: '4',
    name: 'Testing Data',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: [mockUsers[0], mockUsers[1]],
    priority: 'Urgent',
    status: 'In Progress',
  },
  {
    id: '5',
    name: 'Patient Request',
    startDate: '16/06/2024',
    endDate: '18/06/2024',
    assignees: [mockUsers[1], mockUsers[2]],
    priority: 'Urgent',
    status: 'In Progress',
  },
  {
    id: '6',
    name: 'Patient Meetup',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: [mockUsers[0]],
    priority: 'Low',
    status: 'Complete',
  },
];

const priorityCollection = createListCollection({
  items: [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Important', value: 'Important' },
    { label: 'Urgent', value: 'Urgent' },
  ],
});

const pageSizeCollection = createListCollection({
  items: [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
  ],
});

export {
  PRIORITY_COLORS,
  STATUS_CONFIG,
  mockUsers,
  mockTasks,
  priorityCollection,
  pageSizeCollection,
};