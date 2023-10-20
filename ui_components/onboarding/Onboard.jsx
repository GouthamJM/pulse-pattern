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

export default function Onboarding({ handleClick, open, signInLoader }) {
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

    // useEffect(() => {
    //     if (isConnected && address) {
    //         saveToLocalStorage("address", address);
    //         saveToLocalStorage("isLoggedIn", true);
    //         // navigate({
    //         //     pathname: "/",
    //         //     search: location.search,
    //         // });
    //     }
    // }, [isConnecting]);

    return (
        <section className="h-[100dvh] overflow-clip hide-scrollbar bg-black relative">
            <div className="container mx-auto h-full">
                <Image
                    className="w-[30vw] cursor-pointer relative z-10 pt-8"
                    src={ICONS.logoWhite}
                />
                <div className="h-full w-full">
                    <div className="mt-8 relative z-20">
                        <h1 className="heading1_extrabold uppercase text-grey4 italic">
                            Challenge <br /> Track <br /> Conquer!
                        </h1>
                    </div>
                    {signInLoader ? (
                        <p className="paragraph_bold text-black text-center">
                            Signing in...
                        </p>
                    ) : (
                        <div className="flex flex-col items-center gap-5 pb-5">
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
                        </div>
                    )}
                </div>
            </div>
            <Image
                className="absolute bottom-0 h-[100dvh] object-cover"
                src={ICONS.onboardingBg}
                alt="bg"
            />
            <div className="absolute bottom-0 w-full left-0 h-[22vh] onboardingOverlay"></div>
            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-[calc(100vw-40px)]">
                <p className="paragraph_regular text-grey2 mb-4 text-center">
                    Get started now
                </p>
                {signInLoader ? (
                    <p className="paragraph_regular text-grey2 mb-4 text-center">
                        Signing in...
                    </p>
                ) : (
                    <div>
                        <Button
                            className={
                                "absolute font-bold left-1/2 -translate-x-1/2 w-[300px]"
                            }
                            variant={"secondary"}
                            label="Connect via Privy"
                            onClick={() => {
                                handleClick();
                            }}
                        />
                        <Image
                            src={ICONS.privyLogo}
                            width={32}
                            height={32}
                            className="absolute left-1/2 -translate-y-[38px] translate-x-[72px] rounded-full"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
