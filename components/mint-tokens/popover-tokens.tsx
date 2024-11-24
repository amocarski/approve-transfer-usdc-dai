import { useToast } from "@/hooks/use-toast";
import { useTokenContract } from "@/hooks/use-token-details";
import { useStore } from "@/store/store";
import { useState } from "react";
import { parseUnits } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const PopoverTokens = () => {
  const { writeContract, isPending } = useWriteContract();
  const { address } = useAccount();
  const { selectedToken } = useStore();
  const [amountToMint, setAmountToMint] = useState<string | null>(null);
  const { toast } = useToast();

  const { contractAddress, abi, decimals } = useTokenContract(selectedToken);
  const disableTransfer = isPending || !amountToMint;

  const handleMint = async () => {
    if (!amountToMint) return;
    try {
      writeContract(
        {
          abi,
          address: contractAddress as `0x${string}`,
          functionName: "mint",
          args: [address, parseUnits(amountToMint, decimals)],
        },
        {
          onError: (error) => {
            toast({
              title: "Mint error",
              description: error?.message,
              variant: "destructive",
            });
          },
          onSuccess: () => {
            toast({
              title: `${amountToMint} ${selectedToken.toUpperCase()} minted successfully!`,
            });
          },
        }
      );
    } catch (error) {
      console.log("writeContract error", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        className="w-full"
        placeholder="Type amount..."
        onChange={(e: any) => setAmountToMint(e.target.value)}
        disabled={isPending}
      />
      <Button disabled={disableTransfer} onClick={() => handleMint()}>
        {isPending ? "Minting" : "Mint"}
      </Button>
    </div>
  );
};

export default PopoverTokens;
