import React, { useState, createContext, useContext } from 'react';
import { X } from 'lucide-react';
type ToastProps = {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning';
};
type ToastContextType = {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: string) => void;
};
const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const ToastProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, {
      ...toast,
      id
    }]);
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  return <ToastContext.Provider value={{
    toasts,
    addToast,
    removeToast
  }}>
      {children}
    </ToastContext.Provider>;
};
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
export const Toaster = () => {
  const {
    toasts,
    removeToast
  } = useToast();
  if (!toasts.length) return null;
  return <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map(toast => <div key={toast.id} className={`
            rounded-lg border p-4 shadow-md transition-all
            ${toast.type === 'error' ? 'bg-destructive text-destructive-foreground' : toast.type === 'success' ? 'bg-green-100 text-green-800' : toast.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-background text-foreground'}
          `}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
            </div>
            <button onClick={() => removeToast(toast.id)} className="ml-4">
              <X size={16} />
            </button>
          </div>
        </div>)}
    </div>;
};