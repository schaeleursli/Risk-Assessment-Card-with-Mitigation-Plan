import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import LoginScreen from './components/auth/LoginScreen';
import AppLayout from './components/layout/AppLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
const AppContent = () => {
  const {
    user,
    isAuthenticated,
    login,
    logout
  } = useAuth();
  const [activePage, setActivePage] = useState('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }
  const handleNavigate = (page: string) => {
    if (page === 'projects') {
      setSelectedProjectId(null);
    }
    setActivePage(page);
  };
  return <AppLayout activePage={activePage} onNavigate={handleNavigate} onLogout={logout} user={{
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    role: user?.role || 'User'
  }}>
      {activePage === 'projects' && (selectedProjectId ? <ProjectDetail projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} /> : <ProjectList onSelectProject={setSelectedProjectId} />)}
      {activePage === 'statements' && <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Work Method Statements</h2>
          <p className="text-gray-600">
            Your work method statements will appear here.
          </p>
        </div>}
      {activePage === 'reports' && <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Reports</h2>
          <p className="text-gray-600">
            Your reports and analytics will appear here.
          </p>
        </div>}
      {activePage === 'settings' && <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <p className="text-gray-600">
            Configure your application settings here.
          </p>
        </div>}
      {activePage === 'help' && <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Help & Support</h2>
          <p className="text-gray-600">
            Need help? Find guides and contact support here.
          </p>
        </div>}
    </AppLayout>;
};
export function App() {
  return <AuthProvider>
      <AppContent />
    </AuthProvider>;
}