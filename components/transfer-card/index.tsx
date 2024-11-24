import { useTokenContract } from "@/hooks/use-token-details";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { isAddress, parseUnits } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import AllowanceLabel from "./allowance-label";
import TokenSelector from "./token-selector";
import { useToast } from "@/hooks/use-toast";

const TokenCard = () => {
  const { address } = useAccount();
  const { writeContract, error, isPending } = useWriteContract();
  const {
    targetAddress,
    setAmountToSend,
    amountToSend,
    selectedToken,
    mode,
    allowance,
    setAllowance,
    walletBallaance,
  } = useStore();
  const { toast } = useToast();

  const { contractAddress, abi, decimals } = useTokenContract(selectedToken);

  const handleWriteContract = (
    type: "approve" | "transfer" | "transferFrom"
  ) => {
    if (!amountToSend || !walletBallaance) return;
    const formattedAmountToSend = parseUnits(amountToSend.toString(), decimals);

    if (formattedAmountToSend > walletBallaance) {
      toast({
        title: "Insufficient balance",
        description: "You do not have enough balance",
        variant: "destructive",
      });
      return;
    }
    const args =
      type === "approve" || type === "transfer"
        ? [targetAddress, formattedAmountToSend]
        : [targetAddress, address, formattedAmountToSend];
    writeContract(
      {
        abi: abi,
        address: contractAddress as `0x${string}`,
        functionName: type,
        args,
      },
      {
        onSuccess: () => {
          if (amountToSend && type === "approve") {
            setAllowance(formattedAmountToSend);
            toast({
              title: "Allowance approved",
            });
          }
          if (type === "transfer" || type === "transferFrom") {
            toast({
              title: "Transfer successful",
            });
          }
        },
      }
    );
  };

  const disableTransfer =
    isPending ||
    !amountToSend ||
    !targetAddress ||
    (allowance !== null && amountToSend > (allowance as number));

  const disableApprove =
    (mode === "send" ? false : true) ||
    !amountToSend ||
    isPending ||
    (targetAddress !== null && !isAddress(targetAddress));

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: JSON.stringify(error?.message),
        variant: "destructive",
      });
    }
  }, [error]);

  return (
    <Card className="w-full max-w-lg">
      <CardContent>
        <div className="flex w-full items-end gap-3">
          <Input
            action={<AllowanceLabel handleMax={setAmountToSend} />}
            className="w-full"
            label="Amount"
            id="amount"
            placeholder="Type amount..."
            onChange={(e: any) => setAmountToSend(e.target.value)}
            value={(amountToSend as number) || ""}
            type="number"
          />
          <TokenSelector />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button
          disabled={disableApprove}
          variant="outline"
          className="w-full"
          onClick={() => handleWriteContract("approve")}
        >
          Approve
        </Button>
        <Button
          className="w-full"
          disabled={disableTransfer}
          onClick={() =>
            handleWriteContract(mode === "send" ? "transfer" : "transferFrom")
          }
        >
          {mode === "send" ? "Transfer" : "Transfer From"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenCard;
