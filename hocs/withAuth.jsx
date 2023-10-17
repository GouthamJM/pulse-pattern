"use client";
import Onboarding from "@/ui_components/onboarding/Onboard";
import { saveToLocalStorage } from "@/utils";
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

        const handleClick = () => {
            signIn();
        };

        useEffect(() => {
            async function initializeOpenLogin() {
                const chainConfig = {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: BaseGoerli.chainIdHex,
                    rpcTarget: BaseGoerli.info.rpc,
                    displayName: BaseGoerli.name,
                    blockExplorer: BaseGoerli.explorer.url,
                    ticker: BaseGoerli.symbol,
                    tickerName: "Ethereum",
                };

                const web3auth = new Web3AuthNoModal({
                    clientId: web3AuthClientId,
                    web3AuthNetwork: "testnet",
                    chainConfig: chainConfig,
                });

                const privateKeyProvider = new EthereumPrivateKeyProvider({
                    config: { chainConfig },
                });

                const openloginAdapter = new OpenloginAdapter({
                    adapterSettings: {
                        uxMode: "popup",
                        loginConfig: {
                            google: {
                                name: productName,
                                verifier: web3AuthVerifier,
                                typeOfLogin: web3AuthLoginType,
                                clientId: oauthClientId,
                            },
                        },
                    },
                    loginSettings: {
                        mfaLevel: "none",
                    },
                    privateKeyProvider,
                });

                web3auth.configureAdapter(openloginAdapter);
                setWeb3auth(web3auth);
                await web3auth.init();
                setProvider(web3auth.provider);
                setLoader(false);
            }

            initializeOpenLogin();
        }, []);

        const signIn = async () => {
            setSignInLoader(true);
            try {
                if (!web3auth) {
                    return;
                }
                if (web3auth.connected) {
                    return;
                }
                const web3authProvider = await web3auth.connectTo(
                    WALLET_ADAPTERS.OPENLOGIN,
                    {
                        loginProvider: "google",
                    },
                );
                setProvider(web3authProvider);
                const acc = await getAccounts();
                saveToLocalStorage("address", acc);
                saveToLocalStorage("isLoggedIn", true);
                setLoggedIn(true);
                setSignInLoader(false);
            } catch (e) {
                console.log(e, "e");
            }
        };

        const getAccounts = async () => {
            setSignInLoader(true);
            if (!provider) {
                setSignInLoader(false);
                return;
            }
            try {
                const contractAddress = await deploySafeContract();
                setSignInLoader(false);
                return contractAddress;
            } catch (error) {
                setSignInLoader(false);
                return error;
            }
        };

        const deploySafeContract = async () => {
            const ethProvider = new ethers.providers.Web3Provider(provider);
            const signer = await ethProvider.getSigner();
            const ethAdapter = new EthersAdapter({
                ethers,
                signerOrProvider: signer || ethProvider,
            });
            const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapter });
            const safeAccountConfig = {
                owners: [await signer.getAddress()],
                threshold: 1,
            };
            const safeSdkOwnerPredicted = await safeFactory.predictSafeAddress(
                safeAccountConfig,
            );
            return safeSdkOwnerPredicted;
        };

        useEffect(() => {
            async function fetchLogin() {
                if (!loader && web3auth.connected) {
                    const acc = await getAccounts();
                    saveToLocalStorage("address", acc);
                    saveToLocalStorage("isLoggedIn", true);
                    setLoggedIn(true);
                }
            }
            fetchLogin();
        }, [loader]);

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
