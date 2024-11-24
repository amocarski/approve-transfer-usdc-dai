"use client";

import MintTokens from "@/components/mint-tokens";
import TargetCard from "@/components/target-card";
import ToggleMode from "@/components/toggle-mode";
import TokenCard from "@/components/transfer-card";
import WalletBalance from "@/components/wallet-balance";
import WalletButton from "@/components/wallet-button";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected, address, isConnecting } = useAccount();
  const disabledClasses = "pointer-events-none opacity-30 blur-md";

  return (
    <div className="relative min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      {!isConnected && !isConnecting && (
        <WalletButton className="absolute inset-0 z-10 m-auto w-fit" />
      )}

      <main
        className={cn(
          "row-start-2 flex w-full max-w-3xl flex-col items-center gap-8",
          !isConnected && disabledClasses,
          "sm:items-start"
        )}
      >
        <div className="flex w-full justify-between max-sm:flex-col max-sm:gap-4">
          <ToggleMode />
          <div className="flex items-center gap-2 max-sm:justify-center">
            <WalletBalance />
            <MintTokens />
            <WalletButton address={address} disconnect />
          </div>
        </div>
        <TargetCard />
        <div className="flex w-full flex-row justify-center gap-4">
          <TokenCard />
        </div>
      </main>
    </div>
  );
}
