import "@/styles/globals.css";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { baseGoerli, scrollSepolia, polygonZkEvmTestnet } from "wagmi/chains";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivyProvider } from "@privy-io/react-auth";

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
        <>
            <WagmiConfig config={wagmiConfig}>
                <PrivyProvider
                    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
                    config={{
                        supportedChains: [scrollSepolia, polygonZkEvmTestnet],
                        loginMethods: ["email", "google", "twitter", "github", "apple"],
                    }}
                >
                    <Component {...pageProps} />{" "}
                </PrivyProvider>
            </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            <ToastContainer />
        </>
    );
}
