import { useNetworkListener } from "@/hooks/use-network-listener";
import { useTokenContract } from "@/hooks/use-token-details";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { formatUnits } from "viem";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";

const WalletBalance = () => {
  const { address } = useAccount();
  const { selectedToken, setWalletBalance } = useStore();
  const { contractAddress, abi, decimals } = useTokenContract(selectedToken);
  useNetworkListener();
  const { data, refetch } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: "balanceOf",
    args: [address],
  });
  useWatchContractEvent({
    address: contractAddress as `0x${string}`,
    abi,
    eventName: "Transfer",
    onLogs() {
      refetch();
    },
  });

  useEffect(() => {
    if (data) {
      setWalletBalance(data as number);
    }
  }, [data]);

  return (
    <span className="text-xs">
      {data ? formatUnits(BigInt(data as number), decimals) : "0"}{" "}
      {selectedToken.toUpperCase()}
    </span>
  );
};
export default WalletBalance;
