"use client";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";

export function useNetworkListener() {
  const { isConnected, chain, address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { reset } = useStore();

  useEffect(() => {
    const handleNetworkSwitch = () => {
      if (isConnected && chain?.id !== sepolia.id) {
        switchChain({ chainId: sepolia.id });
      }
    };

    handleNetworkSwitch();

    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("chainChanged", handleNetworkSwitch);

      return () => {
        window.ethereum?.removeListener("chainChanged", handleNetworkSwitch);
      };
    }
  }, [isConnected, chain?.id, switchChain]);

  useEffect(() => {
    reset();
  }, [address]);
}
