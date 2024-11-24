import { daiAbi } from "@/abis/dai-abi";
import { usdcAbi } from "@/abis/usdc-abi";

interface TokenContractConfig {
  contractAddress: string;
  abi: typeof daiAbi | typeof usdcAbi;
  decimals: number;
}

export const useTokenContract = (selectedToken: "dai" | "usdc") => {
  const getTokenConfig = (): TokenContractConfig => {
    return {
      contractAddress:
        selectedToken === "dai"
          ? process.env.NEXT_PUBLIC_DAI_ADDRESS!
          : process.env.NEXT_PUBLIC_USDC_ADDRESS!,
      abi: selectedToken === "dai" ? daiAbi : usdcAbi,
      decimals: selectedToken === "dai" ? 18 : 6,
    };
  };

  return getTokenConfig();
};
