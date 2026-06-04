import React, { createContext, useContext, useEffect } from 'react';
import { eventBus } from '@settleone/utils';
import { useNotify } from './NotificationProvider';

interface RealtimeContextType {
  emit: (event: string, data: any) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const RealtimeProvider = ({ children }: { children: React.ReactNode }) => {
  const notify = useNotify();

  useEffect(() => {
    // Register global listeners for Phase 2 requirements
    const listeners = [
      'DealCreated',
      'DealFunded',
      'DealAccepted',
      'DeliverySubmitted',
      'VerificationApproved',
      'DisputeRaised',
      'SettlementReleased',
    ];

    const unsubscribes = listeners.map(event => 
      eventBus.subscribe(event, (data) => {
        notify('info', event, `Event received: ${JSON.stringify(data)}`);
      })
    );

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [notify]);

  return (
    <RealtimeContext.Provider value={{ emit: eventBus.emit.bind(eventBus) }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) throw new Error('useRealtime must be used within RealtimeProvider');
  return context;
};
