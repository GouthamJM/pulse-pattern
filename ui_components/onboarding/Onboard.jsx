import { Button } from "@/ui_components/shared";
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
import { ICONS } from "@/utils/images";
import Image from "next/image";

export default function Onboarding({handleClick, open, signInLoader}) {
    const router = useRouter();
    // const navigate = router.push;
    // const { open } = useWeb3Modal();
    const { address, isConnecting, isConnected } = useAccount();
    const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);

    const [web3auth, setWeb3auth] = useState(null);
    const [provider, setProvider] = useState(null);

    // const signIn = async () => {
    //   setLoading(true);
    //   await web3AuthModalPack.init({
    //     options: web3AuthOptions,
    //     adapters: undefined,
    //     modalConfig,
    //   });
    //   try {
    //     await web3AuthModalPack.signIn();
    //     await createSafe();
    //   } catch {
    //     setLoading(false);
    //     throw new Error("Something went wrong please try again!");
    //   }
    // };

    const createSafe = async () => {
        const safeSdkOwnerPredicted = await getSafes(web3AuthModalPack);
        saveToLocalStorage("address", safeSdkOwnerPredicted);
        saveToLocalStorage("isLoggedIn", true);
        // navigate({
        //     pathname: "/",
        //     search: location.search,
        // });
        setLoading(false);
        setLoggedIn(true);
    };

    const getSafes = async (web3AuthPack) => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(web3AuthPack.getProvider());
        const signer = provider.getSigner();
        const ethAdapter = new EthersAdapter({
            ethers,
            signerOrProvider: signer || provider,
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

    // const handleClick = () => {
    //     signIn();
    // };\

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
        }

        initializeOpenLogin();
    }, []);

    const signIn = async () => {
        try {
            if (!web3auth) {
                return;
            }
            if (web3auth.connected) {
                return;
            }
            const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                loginProvider: "google",
            });
            setProvider(web3authProvider);
            const acc = await getAccounts();
            saveToLocalStorage("address", acc);
            saveToLocalStorage("isLoggedIn", true);
            // navigate({
            //     pathname: "/",
            //     search: location.search,
            // });
        } catch (e) {
            console.log(e, "e");
        }
    };

    const getAccounts = async () => {
        if (!provider) {
            return;
        }
        try {
            const contractAddress = await deploySafeContract();
            return contractAddress;
        } catch (error) {
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
        if (isConnected && address) {
            saveToLocalStorage("address", address);
            saveToLocalStorage("isLoggedIn", true);
            // navigate({
            //     pathname: "/",
            //     search: location.search,
            // });
        }
    }, [isConnecting]);

    return (
        <section className="h-full overflow-y-auto hide-scrollbar">
            <div className="container mx-auto h-full py-10">
                <div className="h-full w-full">
                    <div className="relative text-center mt-10 mb-[20vh]">
                        <Image
                            className="w-[30vw] cursor-pointer relative z-10 mx-auto"
                            src={ICONS.Logo}
                        />
                        <Image
                            className="w-[20vw] absolute -top-[4vh] left-1/2 -translate-x-1/2"
                            src={ICONS.LogoPattern}
                        />
                    </div>
                    <div className="text-center mb-[20vh] relative z-20">
                        <p className="paragraph_bold text-black">
                            Level Up Your Fitness!
                        </p>
                        <h1 className="heading1_extrabold uppercase text-green italic">
                            Challenge <br /> Track <br /> Conquer!
                        </h1>
                    </div>
                    {signInLoader ? <p className="paragraph_bold text-black text-center">
                            Signing in...
                        </p> : <div className="flex flex-col items-center gap-5 pb-5">
                        <Button
                            variant={"primary"}
                            label="Google signin"
                            onClick={() => {
                                handleClick();
                            }}
                        />
                        <Button
                            variant={"primary"}
                            label="WalletConnect Signin"
                            onClick={() => {
                                open();
                            }}
                        />
                    </div>}
                </div>
            </div>
        </section>
    );
}
