import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from '../features/auth/providers/AuthProvider';
import { Toaster } from '../ui/Toaster';
// Pages
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProjectPage from '../pages/ProjectPage';
import WmsBuilderPage from '../pages/WmsBuilderPage';
import WmsPdfPage from '../pages/WmsPdfPage';
import NotFoundPage from '../pages/NotFoundPage';
// Protected route wrapper
const ProtectedRoute = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // This would normally check auth state from a context
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export function App() {
  return <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>} />
            <Route path="/projects/:projectId" element={<ProtectedRoute>
                  <ProjectPage />
                </ProtectedRoute>} />
            <Route path="/projects/:projectId/wms/:wmsId" element={<ProtectedRoute>
                  <WmsBuilderPage />
                </ProtectedRoute>} />
            <Route path="/projects/:projectId/wms/:wmsId/pdf" element={<ProtectedRoute>
                  <WmsPdfPage />
                </ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>;
}