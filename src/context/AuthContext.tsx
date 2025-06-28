import React, { useEffect, useState, createContext, useContext } from 'react';
type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('wms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = (email: string, password: string) => {
    // In a real app, you would validate credentials with an API
    // This is a mock implementation
    const newUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: 'Project Manager'
    };
    setUser(newUser);
    localStorage.setItem('wms_user', JSON.stringify(newUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('wms_user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};