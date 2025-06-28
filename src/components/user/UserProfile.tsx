import React, { useEffect, useState, useRef } from 'react';
import { UserIcon, BellIcon, ChevronDownIcon, LogOutIcon, UserCogIcon, MoonIcon, SunIcon, MessageSquareIcon, CalendarIcon } from 'lucide-react';
type UserProfileProps = {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  onLogout: () => void;
};
const UserProfile = ({
  user,
  onLogout
}: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([{
    id: 1,
    title: 'New comment on WMS-2023-001',
    time: '10 minutes ago',
    read: false
  }, {
    id: 2,
    title: 'Risk assessment approved',
    time: '2 hours ago',
    read: false
  }, {
    id: 3,
    title: 'Project status updated',
    time: 'Yesterday',
    read: true
  }]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would apply dark mode to the entire app here
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({
      ...n,
      read: true
    })));
  };
  return <div className="flex items-center space-x-4">
      {/* Notifications */}
      <div className="relative" ref={notificationRef}>
        <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full" onClick={() => setShowNotifications(!showNotifications)}>
          <BellIcon size={20} />
          {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-headspace-orange rounded-full"></span>}
        </button>
        {showNotifications && <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">Notifications</p>
              {unreadCount > 0 && <button onClick={markAllAsRead} className="text-xs text-headspace-blue hover:underline">
                  Mark all as read
                </button>}
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.length > 0 ? notifications.map(notification => <div key={notification.id} className={`px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-headspace-purple bg-opacity-10 flex items-center justify-center">
                          <MessageSquareIcon size={14} className="text-headspace-purple" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {notification.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <CalendarIcon size={12} className="text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>) : <div className="px-4 py-6 text-center text-gray-500">
                  No notifications
                </div>}
            </div>
            <div className="px-4 pt-2 pb-1 border-t border-gray-100">
              <button className="w-full text-center text-xs text-headspace-blue hover:underline">
                View all notifications
              </button>
            </div>
          </div>}
      </div>
      {/* User Profile */}
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-headspace-purple bg-opacity-10 text-headspace-purple">
            {user.avatar ? <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" /> : <UserIcon size={18} />}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-700">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <ChevronDownIcon size={16} className="text-gray-500 hidden md:block" />
        </button>
        {isOpen && <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <span className="inline-block px-2 py-1 bg-headspace-purple bg-opacity-10 text-xs text-headspace-purple rounded-full">
                  {user.role}
                </span>
              </div>
            </div>
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Preferences
              </p>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  {isDarkMode ? <MoonIcon size={16} className="text-gray-600" /> : <SunIcon size={16} className="text-gray-600" />}
                  <span className="ml-2 text-sm text-gray-700">Dark Mode</span>
                </div>
                <button onClick={toggleDarkMode} className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isDarkMode ? 'bg-headspace-purple' : 'bg-gray-200'}`}>
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-2">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => {
            setIsOpen(false);
            // Navigate to profile page in a real app
          }}>
                <UserCogIcon size={16} className="mr-2 text-gray-500" />
                Account Settings
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={onLogout}>
                <LogOutIcon size={16} className="mr-2 text-gray-500" />
                Sign out
              </button>
            </div>
          </div>}
      </div>
    </div>;
};
export default UserProfile;