"use client";

import { ConnectKitButton } from "connectkit";
import { Button } from "./ui/button";
import { formatAddress } from "@/lib/utils";

type WalletButtonProps = {
  disconnect?: boolean;
  className?: string;
  address?: string;
};

const WalletButton = ({
  disconnect,
  className,
  address,
}: WalletButtonProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <ConnectKitButton.Custom>
      {({ show }) => {
        return (
          <Button
            size={disconnect ? "sm" : "lg"}
            variant={disconnect ? "outline" : "default"}
            className={className}
            onClick={show}
          >
            {!disconnect
              ? "Connect Wallet"
              : `Disconnect ${formatAddress(address)}`}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default WalletButton;
