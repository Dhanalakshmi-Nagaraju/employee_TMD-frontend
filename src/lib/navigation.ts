import {
  ClipboardList,
  LayoutDashboard,
  ListTodo,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const managerNavItems: NavItem[] = [
  { label: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard },
  { label: "Employees", href: "/manager/employees", icon: Users },
  { label: "Tasks", href: "/manager/tasks", icon: ListTodo },
];

export const employeeNavItems: NavItem[] = [
  { label: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
  { label: "My Tasks", href: "/employee/my-tasks", icon: ClipboardList },
];
