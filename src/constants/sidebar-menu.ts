import {
  Category,
  People,
  Call,
  Book,
  Stickynote,
  Folder2,
  Note1,
  TaskSquare,
  NotificationBing,
  MenuBoard,
  MessageEdit,
  Edit,
} from 'iconsax-reactjs';

export const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: Category },
  { id: 'mkvanbinnen', label: 'MKVanBinnen', icon: Stickynote },
  {
    id: 'document-management',
    label: 'Document Management',
    icon: Folder2,
  },
  { id: 'patient-info', label: 'Patient Information', icon: People },
  { id: 'agenda', label: 'Agenda', icon: Note1 },
  {
    id: 'my-department',
    label: 'My Department',
    icon: Book,
    children: [
      { id: 'news', label: 'News' },
      { id: 'members', label: 'Members' },
      { id: 'to-do', label: 'To - Do', badge: 3 },
      { id: 'form-task', label: 'Form Task' },
      { id: 'agenda-group', label: 'Agenda' },
      { id: 'follow-up', label: 'Follow up system' },
    ],
  },
  { id: 'phone-numbers', label: 'Phone numbers', icon: Call },
  { id: 'protocols', label: 'My to do Protocols', icon: TaskSquare },
  {
    id: 'notifications',
    label: 'My Notifications',
    icon: NotificationBing,
    badge: 5,
  },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: MenuBoard },
  {
    id: 'super-admin',
    label: 'Super Admin',
    icon: MessageEdit,
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: Edit,
    children: [
      { id: 'admin-agenda', label: 'Agenda' },
      { id: 'admin-news', label: 'News' },
      {
        id: 'department-rules',
        label: 'Department Rules',
      },
      { id: 'admin-follow-up', label: 'Follow up system' },
    ],
  },
];
