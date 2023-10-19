import { useWallets } from "@privy-io/react-auth";
import { useMemo } from "react";

export default function usePrivyWalletDetail() {
    const { wallets } = useWallets();
    console.log(wallets, "wallets");
    const walletDetail = useMemo(() => {
        const embeddedWallet = wallets?.find(
            (wallet) => wallet.walletClientType === "privy",
        );
        return embeddedWallet;
    }, [wallets]);

    return { walletDetail };
}
