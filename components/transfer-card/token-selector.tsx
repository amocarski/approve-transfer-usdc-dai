import { useStore } from "@/store/store";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

const TokenSelector = () => {
  const { selectedToken, setSelectedToken, reset } = useStore();
  return (
    <Select
      defaultValue={selectedToken}
      onValueChange={(value: string) => {
        reset();
        setSelectedToken(value as "dai" | "usdc");
      }}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dai">DAI</SelectItem>
        <SelectItem value="usdc">USDC</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default TokenSelector;
