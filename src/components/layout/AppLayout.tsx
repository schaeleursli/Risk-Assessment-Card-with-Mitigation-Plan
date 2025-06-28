import React, { useState } from 'react';
import Sidebar from '../navigation/Sidebar';
import MobileNav from '../navigation/MobileNav';
import UserProfile from '../user/UserProfile';
import CompanyInfo from '../user/CompanyInfo';
import { MenuIcon, XIcon } from 'lucide-react';
type AppLayoutProps = {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
};
const AppLayout = ({
  children,
  activePage,
  onNavigate,
  onLogout,
  user
}: AppLayoutProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-white" onClick={e => e.stopPropagation()}>
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="bg-headspace-purple w-8 h-8 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">WMS</span>
                </div>
                <h2 className="text-lg font-bold">Work Method</h2>
              </div>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <XIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <CompanyInfo />
            </div>
            <Sidebar activePage={activePage} onNavigate={page => {
          onNavigate(page);
          setMobileSidebarOpen(false);
        }} onLogout={onLogout} />
          </div>
        </div>}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="md:hidden">
              <button onClick={() => setMobileSidebarOpen(true)} className="p-2 rounded-full hover:bg-gray-100">
                <MenuIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            <div className="hidden md:flex items-center">
              <h1 className="text-xl font-bold text-headspace-purple capitalize">
                {activePage}
              </h1>
            </div>
            {/* User Profile */}
            <UserProfile user={user} onLogout={onLogout} />
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          <div className="md:hidden mb-4">
            <h1 className="text-xl font-bold text-headspace-purple capitalize">
              {activePage}
            </h1>
          </div>
          <div className="hidden md:block mb-6">
            <CompanyInfo />
          </div>
          {children}
        </main>
        {/* Mobile Navigation */}
        <MobileNav activePage={activePage} onNavigate={onNavigate} />
      </div>
    </div>;
};
export default AppLayout;