import "@/styles/globals.css";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const chains = [baseGoerli];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function App({ Component, pageProps }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <Component {...pageProps} />
        </WagmiConfig>
    );
}
