"use client";
import Onboarding from "@/ui_components/onboarding/Onboard";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { web3AuthConfig, BaseGoerli } from "@/constants/baseGoerli";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { ethers } from "ethers";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { useEffect, useState } from "react";
import {
    oauthClientId,
    productName,
    web3AuthClientId,
    web3AuthLoginType,
    web3AuthVerifier,
} from "@/constants/index";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useWallets, usePrivy } from "@privy-io/react-auth";

function withAuth(Component) {
    const Auth = (props) => {
        const [loader, setLoader] = useState(true);
        const [loggedIn, setLoggedIn] = useState(false);

        const router = useRouter();
        const navigate = router.push;
        const { open } = useWeb3Modal();
        const { address, isConnecting, isConnected } = useAccount();
        const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);

        const [web3auth, setWeb3auth] = useState(null);
        const [provider, setProvider] = useState(null);
        const [signInLoader, setSignInLoader] = useState(false);

  const { login, ready, authenticated, user } = usePrivy();

        // const getAccounts = async (_provider) => {
        //     setSignInLoader(true);
        //     if (!_provider) {
        //         setSignInLoader(false);
        //         return;
        //     }
        //     try {
        //         const contractAddress = await deploySafeContract(_provider);
        //         setSignInLoader(false);
        //         return contractAddress;
        //     } catch (error) {
        //         setSignInLoader(false);
        //         return error;
        //     }
        // };

        // const deploySafeContract = async (_provider) => {
        //     let initProvider = _provider;
        //     const ethProvider = new ethers.providers.Web3Provider(initProvider);
        //     const signer = await ethProvider.getSigner();
        //     const ethAdapter = new EthersAdapter({
        //         ethers,
        //         signerOrProvider: signer || ethProvider,
        //     });
        //     const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapter });
        //     const safeAccountConfig = {
        //         owners: [await signer.getAddress()],
        //         threshold: 1,
        //     };
        //     const safeSdkOwnerPredicted = await safeFactory.predictSafeAddress(
        //         safeAccountConfig,
        //     );
        //     return safeSdkOwnerPredicted;
        // };

        const {wallets} = useWallets();

        const handleClick = () => {
            setSignInLoader(true);
            login();
        };

        useEffect(() => {
            async function initPriv() {
                if (ready) {
                    setLoader(false);
                    // setSignInLoader(true);
                    if (ready && authenticated && user) {
                        const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
                        // const ethProvider = embeddedWallet && await embeddedWallet.getEthereumProvider(); Provider variable
                        saveToLocalStorage("address", embeddedWallet.address);
                            saveToLocalStorage("isLoggedIn", true);
                            setLoggedIn(true);
                            setSignInLoader(false);
                    }
            }
            }

            (async function () {
                await initPriv();
            })();
        }, [ready, authenticated, user]);

        if (loader)
            return <div className="flex items-center justify-center">Loading...</div>;
        if (!loggedIn) {
            return (
                <div className="app mobView">
                    <Onboarding
                        handleClick={handleClick}
                        open={open}
                        signInLoader={signInLoader}
                    />
                    </div>
            );
        }

        return <Component {...props} />;
        
    };
    return Auth;
}

export default withAuth;
