import { EventEmitter } from 'events';

export type SettleOneEvent = 
  | 'DealCreated'
  | 'DealFunded'
  | 'DealAccepted'
  | 'DeliverySubmitted'
  | 'VerificationApproved'
  | 'DisputeRaised'
  | 'SettlementReleased';

type Listener = (data: any) => void;

class SettleOneEventBus {
  private listeners: Map<SettleOneEvent, Set<Listener>> = new Map();

  emitEvent(event: SettleOneEvent, data: any) {
    console.log(`[SettleOne EventBus] Emitting: ${event}`, data);
    this.listeners.get(event)?.forEach(cb => cb(data));
  }

  onEvent(event: SettleOneEvent, callback: Listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
    return () => this.listeners.get(event)?.delete(callback);
  }
}

export const eventBus = new SettleOneEventBus();
