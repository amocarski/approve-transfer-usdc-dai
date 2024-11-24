import { useToast } from "@/hooks/use-toast";
import { useTokenContract } from "@/hooks/use-token-details";
import { web3Config } from "@/providers/web3-provider";
import { useStore } from "@/store/store";
import { useState } from "react";
import { isAddress, isAddressEqual } from "viem";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const TargetCard = () => {
  const { address } = useAccount();
  const [addressState, setAddressState] = useState({
    allowanceError: undefined as string | undefined,
    validationError: undefined as string | undefined,
  });
  const { mode, targetAddress, selectedToken, setAllowance, setTargetAddress } =
    useStore();
  const { contractAddress, abi } = useTokenContract(selectedToken);
  const { toast } = useToast();

  const handleSet = async () => {
    const args =
      mode === "send" ? [address, targetAddress] : [targetAddress, address];
    try {
      const allowanceData = await readContract(web3Config, {
        address: contractAddress as `0x${string}`,
        abi,
        functionName: "allowance",
        args,
      });
      if (allowanceData) {
        console.log("allowanceData", allowanceData);
        setAllowance(allowanceData as number);
      }
    } catch (error) {
      toast({
        title: "Allowance error",
        description: JSON.stringify(error),
        variant: "destructive",
      });
      console.log("readContract error", error);
    }
  };

  const handleInputChange = (e: any) => {
    setTargetAddress(e.target.value);
    validateAddress(e.target.value ?? "0x");
  };

  const validateAddress = (targetAddress: `0x${string}`) => {
    const error = !isAddress(targetAddress)
      ? "Invalid wallet address"
      : isAddressEqual(address as `0x${string}`, targetAddress)
      ? "Cannot send to self"
      : undefined;
    setAddressState((prev) => ({ ...prev, validationError: error }));
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-row items-end gap-4 max-sm:flex-col">
        <div className="grid w-full items-center gap-1.5">
          <Input
            error={addressState.validationError}
            label={mode === "send" ? "Target Wallet" : "Source Wallet"}
            id="target-wallet"
            placeholder="Type wallet addr..."
            onChange={handleInputChange}
            value={targetAddress ?? ""}
          />
        </div>
        <div className="flex flex-row gap-2 max-sm:w-full">
          <Button
            className="w-full min-w-24"
            disabled={
              !isAddress(targetAddress as string) ||
              !!addressState.validationError
            }
            onClick={() => handleSet()}
          >
            Set
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setTargetAddress("0x")}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetCard;
