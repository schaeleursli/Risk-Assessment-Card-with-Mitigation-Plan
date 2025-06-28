import React from 'react';
import { HomeIcon, ClipboardIcon, SettingsIcon, BarChartIcon, HelpCircleIcon, LogOutIcon, BookOpenIcon } from 'lucide-react';
type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
};
const Sidebar = ({
  activePage,
  onNavigate,
  onLogout
}: SidebarProps) => {
  const navItems = [{
    id: 'projects',
    label: 'Projects',
    icon: HomeIcon,
    description: 'Manage your work projects'
  }, {
    id: 'statements',
    label: 'Statements',
    icon: ClipboardIcon,
    description: 'Work method statements'
  }, {
    id: 'reports',
    label: 'Reports',
    icon: BarChartIcon,
    description: 'Analytics and reporting'
  }, {
    id: 'knowledge',
    label: 'Knowledge Base',
    icon: BookOpenIcon,
    description: 'Guides and resources'
  }, {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon,
    description: 'Configure your workspace'
  }, {
    id: 'help',
    label: 'Help',
    icon: HelpCircleIcon,
    description: 'Get support'
  }];
  return <div className="hidden md:flex flex-col h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-headspace-purple w-10 h-10 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">WMS</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">Work Method</h2>
            <p className="text-xs text-gray-500">Safety Management</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
        <ul className="space-y-1.5 px-3">
          {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return <li key={item.id}>
                <button onClick={() => onNavigate(item.id)} className={`flex items-center w-full px-4 py-3 text-left rounded-xl transition-colors ${isActive ? 'bg-headspace-purple bg-opacity-10 text-headspace-purple font-medium' : 'text-gray-600 hover:bg-gray-100'}`} title={item.description}>
                  <Icon size={20} className={isActive ? 'text-headspace-orange' : 'text-gray-500'} />
                  <span className="ml-3">{item.label}</span>
                  {isActive && <span className="ml-auto w-1.5 h-5 bg-headspace-orange rounded-full"></span>}
                </button>
              </li>;
        })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button onClick={onLogout} className="flex items-center w-full px-4 py-2.5 text-left text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
          <LogOutIcon size={20} className="text-gray-500" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>;
};
export default Sidebar;