
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { mockTickets } from '../data/mockData';
import { 
  LayoutDashboard, 
  Ticket, 
  LogOut, 
  Users, 
  Settings,
  Moon,
  Sun,
  CreditCard,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  companyName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, companyName = 'TechCare Africa' }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [openTicketsCount, setOpenTicketsCount] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState('w-64');

  useEffect(() => {
    // Calculate open tickets count
    const count = mockTickets.filter(ticket => ticket.status === 'Open').length;
    setOpenTicketsCount(count);
  }, []);

  useEffect(() => {
    // Update sidebar width based on collapsed state
    setSidebarWidth(collapsed ? 'w-20' : 'w-64');
  }, [collapsed]);

  // Define menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'tickets', label: 'Tickets', icon: Ticket, badge: openTicketsCount },
      { id: 'chat', label: 'Messages', icon: MessageSquare },
      { id: 'payments', label: 'Payments', icon: CreditCard },
    ];

    if (user?.role === 'admin' || user?.role === 'superadmin') {
      baseItems.push({ id: 'settings', label: 'Settings', icon: Settings });
    }

    if (user?.role === 'superadmin') {
      baseItems.push({ id: 'users', label: 'Users', icon: Users });
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div 
      className={`${sidebarWidth} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      {/* Collapse button */}
      <button 
        className="absolute -right-3 top-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
            <Ticket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-semibold text-slate-800 dark:text-slate-100">{companyName}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Helpdesk Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {!collapsed && item.label}
                  </div>
                  {!collapsed && item.badge && item.badge > 0 && (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400">{item.badge}</Badge>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme Toggle & Logout */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <Button
          onClick={toggleTheme}
          variant="ghost"
          className={`${collapsed ? 'justify-center w-full' : 'justify-start w-full'} text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 mr-3" />
              {!collapsed && "Light Mode"}
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 mr-3" />
              {!collapsed && "Dark Mode"}
            </>
          )}
        </Button>
        
        <Button
          onClick={logout}
          variant="ghost"
          className={`${collapsed ? 'justify-center w-full' : 'justify-start w-full'} text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800`}
        >
          <LogOut className="w-4 h-4 mr-3" />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
