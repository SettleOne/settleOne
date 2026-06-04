import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@settleone/design-system';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  notify: (type: NotificationType, title: string, message: string) => void;
  remove: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, notify, remove }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={cn(
              'w-[320px] rounded-[12px] border p-4 shadow-lg animate-in slide-in-from-right-8 fade-in duration-300',
              n.type === 'success' && 'border-[#10B981] bg-white',
              n.type === 'error' && 'border-[#EF4444] bg-white',
              n.type === 'warning' && 'border-[#F59E0B] bg-white',
              n.type === 'info' && 'border-[#E5E7EB] bg-white'
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-[#111827]">{n.title}</h4>
                <p className="mt-1 text-xs text-[#6B7280]">{n.message}</p>
              </div>
              <button onClick={() => remove(n.id)} className="text-[#6B7280] hover:text-[#111827]">×</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotify must be used within NotificationProvider');
  return context.notify;
};
