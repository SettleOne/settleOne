import { type PublicClient, type WatchContractEventParameters } from 'viem';

type EventCallback = (...args: unknown[]) => void;
type UnsubscribeFn = () => void;

interface EventSubscription {
  id: string;
  unsubscribe: UnsubscribeFn;
}

class EventBus {
  private subscriptions: Map<string, EventSubscription> = new Map();
  private listeners: Map<string, Set<EventCallback>> = new Map();

  /**
   * Subscribe to on-chain contract events via viem's watchContractEvent
   */
  watchContract(
    client: PublicClient,
    params: WatchContractEventParameters,
    key: string
  ): UnsubscribeFn {
    // Unsubscribe existing subscription with same key
    this.unsubscribe(key);

    const unwatch = client.watchContractEvent({
      ...params,
      onLogs: (logs) => {
        // Emit to local listeners
        const eventListeners = this.listeners.get(key);
        if (eventListeners) {
          eventListeners.forEach((cb) => cb(logs));
        }
        // Also call the original onLogs if provided
        if (params.onLogs) {
          (params.onLogs as (logs: unknown) => void)(logs);
        }
      },
    });

    this.subscriptions.set(key, { id: key, unsubscribe: unwatch });
    return unwatch;
  }

  /**
   * Add a local event listener
   */
  on(event: string, callback: EventCallback): UnsubscribeFn {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  /**
   * Emit a local event
   */
  emit(event: string, ...args: unknown[]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((cb) => cb(...args));
    }
  }

  /**
   * Unsubscribe from a specific contract event
   */
  unsubscribe(key: string): void {
    const sub = this.subscriptions.get(key);
    if (sub) {
      sub.unsubscribe();
      this.subscriptions.delete(key);
    }
  }

  /**
   * Unsubscribe from all contract events
   */
  unsubscribeAll(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();
    this.listeners.clear();
  }
}

export const eventBus = new EventBus();
export type { EventCallback, UnsubscribeFn };
