import { create } from "zustand";

type Actions = {
  setAllowance: (allowance: number | string | bigint) => void;
  setTargetAddress: (address: `0x${string}`) => void;
  setSelectedToken: (token: "dai" | "usdc") => void;
  setAmountToSend: (amount: number | null | bigint) => void;
  setMode: (mode: "send" | "receive") => void;
  setWalletBalance: (balance: number) => void;
  reset: () => void;
};

type State = {
  mode: "send" | "receive";
  targetAddress: `0x${string}` | null;
  amountToSend: number | null | bigint;
  selectedToken: "dai" | "usdc";
  allowance: number | null | string | bigint;
  walletBallaance: number | null;
};

const initialState: State = {
  mode: "send",
  targetAddress: null,
  amountToSend: null,
  selectedToken: "usdc",
  allowance: null,
  walletBallaance: null,
};

export const useStore = create<State & Actions>((set) => ({
  ...initialState,
  setAllowance: (allowance) => set({ allowance }),
  setTargetAddress: (address) => set({ targetAddress: address }),
  setSelectedToken: (token) => set({ selectedToken: token }),
  setAmountToSend: (amount) => set({ amountToSend: amount }),
  setMode: (mode) => set({ mode }),
  setWalletBalance: (balance) => set({ walletBallaance: balance }),
  reset: () => {
    set(initialState);
  },
}));
