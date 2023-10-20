import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { scrollSepolia } from "viem/chains";

export default function usePrivyClient() {
    const { wallets } = useWallets();
    const [privyClient, setPrivyClient] = useState();

    useEffect(() => {
        async function initPriv() {
            const embeddedWallet = wallets.find(
                (wallet) => wallet.walletClientType === "privy",
            );
            const ethProvider = await embeddedWallet.getEthereumProvider();
            const client = createWalletClient({
                account: embeddedWallet?.address,
                chain: scrollSepolia,
                transport: custom(ethProvider),
            });
            setPrivyClient(client);
        }

        (async function () {
            if (wallets?.length) {
                await initPriv();
            }
        })();
    }, [wallets]);

    return { privyClient };
}
