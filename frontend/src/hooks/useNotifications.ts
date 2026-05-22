import { useWatchContractEvent } from "wagmi";
import { DEAL_MANAGER_ABI } from "../constants/abis";
import { DEAL_MANAGER_ADDRESS } from "../constants/contracts";
import { useToastStore } from "../components/NotificationToast";

export function useNotifications() {
  const { addToast } = useToastStore();

  // Watch for DealCreated
  useWatchContractEvent({
    address: DEAL_MANAGER_ADDRESS,
    abi: DEAL_MANAGER_ABI,
    eventName: "DealCreated",
    onLogs(logs: any) {
      logs.forEach((log: any) => {
        addToast({
          title: "Protocol Initialized",
          message: `Deal #${log.args.dealId} has been successfully broadcasted to the network.`,
          type: "protocol",
        });
      });
    },
  });

  // We could add more event watchers here (Funded, ProofSubmitted, etc.)
}
