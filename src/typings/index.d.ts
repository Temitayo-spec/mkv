interface MenuItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  badge?: number;
  children?: MenuItem[];
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  assignees: User[];
  priority: 'Low' | 'Medium' | 'Important' | 'Urgent';
  status: 'To Do' | 'In Progress' | 'Complete';
}

interface FormErrors {
  name?: string;
  startDate?: string;
  endDate?: string;
  dateRange?: string;
  assignees?: string;
  priority?: string;
  general?: string;
}

type FormDataField = keyof typeof formData;
type FormDataValue = string | User[] | Task['priority'] | Task['status'];

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  markTaskCompleted: (id: string) => void;
  markTaskIncomplete: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}
