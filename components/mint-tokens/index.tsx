import { useStore } from "@/store/store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import PopoverTokens from "./popover-tokens";

const MintTokens = () => {
  const { selectedToken } = useStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Mint {selectedToken.toUpperCase()}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverTokens />
      </PopoverContent>
    </Popover>
  );
};
export default MintTokens;
