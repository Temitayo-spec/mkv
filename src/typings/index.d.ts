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