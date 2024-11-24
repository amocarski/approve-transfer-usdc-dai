import { useTokenContract } from "@/hooks/use-token-details";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import { InfoIcon } from "lucide-react";
import { formatUnits } from "viem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const AllowanceLabel = ({
  handleMax,
}: {
  handleMax: (allowance: number | null) => void;
}) => {
  const { allowance, selectedToken } = useStore();
  const { decimals } = useTokenContract(selectedToken);
  const formattedAllowance = allowance
    ? formatUnits(BigInt(allowance as number), decimals)
    : "---";

  return (
    <div className="flex h-4 gap-1 text-xs">
      <span>Allowance:</span>
      <span>{formattedAllowance.toString()}</span>
      <div className="flex items-center gap-1">
        {allowance !== null && (
          <span
            onClick={async () => {
              handleMax(Number(formatUnits(BigInt(allowance), decimals)));
            }}
            className={cn(
              "font-bold hover:text-muted-foreground hover:cursor-pointer"
            )}
          >
            MAX
          </span>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon size={12} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Allowance only awaliable while provided target wallet </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AllowanceLabel;
