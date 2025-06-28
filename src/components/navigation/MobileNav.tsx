import React from 'react';
import { HomeIcon, ClipboardIcon, BarChartIcon, SettingsIcon, UserIcon } from 'lucide-react';
type MobileNavProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};
const MobileNav = ({
  activePage,
  onNavigate
}: MobileNavProps) => {
  const navItems = [{
    id: 'projects',
    label: 'Projects',
    icon: HomeIcon
  }, {
    id: 'statements',
    label: 'Statements',
    icon: ClipboardIcon
  }, {
    id: 'reports',
    label: 'Reports',
    icon: BarChartIcon
  }, {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon
  }];
  return <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return <button key={item.id} onClick={() => onNavigate(item.id)} className="flex flex-col items-center justify-center w-full h-full relative">
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-headspace-orange bg-opacity-10' : ''}`}>
                <Icon size={20} className={isActive ? 'text-headspace-orange' : 'text-gray-500'} />
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'text-headspace-orange font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
              {isActive && <span className="absolute bottom-0 w-10 h-0.5 bg-headspace-orange rounded-t-full"></span>}
            </button>;
      })}
        <button onClick={() => onNavigate('profile')} className="flex flex-col items-center justify-center w-full h-full">
          <div className="p-1.5 rounded-full">
            <UserIcon size={20} className="text-gray-500" />
          </div>
          <span className="text-xs mt-1 text-gray-500">Profile</span>
        </button>
      </div>
    </div>;
};
export default MobileNav;