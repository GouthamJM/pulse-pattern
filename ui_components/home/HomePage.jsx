import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, InputField } from "@/ui_components/shared";
import {
    getTokenFormattedNumber,
    getNounAvatar,
    trimAddress,
    copyToClipBoard,
    getFromLocalStorage,
} from "@/utils";

import { getBalance, getUsdPrice } from "@/utils/apiservices";
import { hexToNumber } from "viem";
import { ICONS } from "@/utils/images";
import { useWeb3Modal } from "@web3modal/react";
import Image from "next/image";
import {
    useSendTransaction,
    useWaitForTransaction,
    usePrepareSendTransaction,
} from "wagmi";
import usePrivyWalletDetail from "@/utils/hooks/wallet/usePrivyWalletDetail";
import { useW3iAccount } from "@web3inbox/widget-react";
import userChallenges from "@/utils/hooks/api/userChallenges";
import Spinner from "../shared/Spinner";
import { Challenge } from "../challenges";
import { scrollSepolia, polygonZkEvmTestnet } from "wagmi/chains";

export default function HomePage() {
    const [bal, setBal] = useState("");
    const [tokenPrice, setTokenPrice] = useState("");
    const [depositValue, setDepositValue] = useState("");
    const [depositInputValue, setDepositInputValue] = useState("");
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);
    const [usdValue, setUsdValue] = useState("");
    const [showcopyText, setShowCopyText] = useState(false);

    const router = useRouter();
    const navigate = router.push;
    const { walletDetail } = usePrivyWalletDetail();
    const privyAddress = walletDetail?.address;
    const { challenges, userChallengeLoader } = userChallenges(privyAddress);
    const { isConnected } = useW3iAccount();
    const { open } = useWeb3Modal();

    const toAmount = Number(depositInputValue) * Math.pow(10, 18);
    const { config } = usePrepareSendTransaction({
        to: privyAddress,
        value: Math.round(toAmount),
    });
    const { data, sendTransaction, status } = useSendTransaction(config);
    const { isLoading, isSuccess, error } = useWaitForTransaction({
        hash: data?.hash,
    });

    useEffect(() => {
        if (walletDetail) {
            fetchBalance(privyAddress);
        }
    }, [walletDetail]);

    useEffect(() => {
        if (!isLoading && isSuccess) {
            setTransactionLoading(false);
            fetchBalance();
        } else if (error) {
            setTransactionLoading(false);
            console.log("error", error);
        }
    }, [isSuccess, error, status]);

    const fetchBalance = async (address) => {
        getUsdPrice()
            .then(async (res) => {
                const chains = [scrollSepolia, polygonZkEvmTestnet];
                console.log(
                    "🚀 ~ file: Header.jsx:13 ~ handleChainSwitch ~ chains:",
                    chains,
                );
                const chnId = walletDetail.chainId.split(":")[1];
                const selChain = chains.filter(
                    (val) => String(val.id) === String(chnId),
                )[0];
                const balance = await getBalance(address, selChain.rpcUrls.default.http);
                const formattedNumber = getTokenFormattedNumber(
                    hexToNumber(balance.result),
                    18,
                );
                const price = (formattedNumber * res.data.ethereum.usd).toFixed(2);
                setUsdValue(price);
                if (formattedNumber > 0) {
                    setDisableBtn(false);
                } else {
                    setDisableBtn(true);
                }
                setBal(formattedNumber);
                setTokenPrice(res.data.ethereum.usd);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleDepositInputChange = (val) => {
        const valueWithoutDollarSign = val.replace(/[^\d.]/g, "");
        let appendDollar = "";
        if (Number(valueWithoutDollarSign) > 0) {
            appendDollar = "$";
        }
        setDepositValue(`${appendDollar}${valueWithoutDollarSign}`);
        const tokenIputValue = Number(valueWithoutDollarSign) / Number(tokenPrice);
        setDepositInputValue(tokenIputValue);
    };

    const handleDepositClick = async () => {
        setTransactionLoading(true);
        try {
            const result = sendTransaction();
        } catch (e) {
            setTransactionLoading(false);
            console.log(e, "error");
        }
    };

    const handleCopy = () => {
        copyToClipBoard(privyAddress);
        setShowCopyText(true);
        setTimeout(() => {
            setShowCopyText(false);
        }, 2000);
    };
    return (
        <section className="mt-4 h-full bg-white overflow-y-auto hide-scrollbar">
            {userChallengeLoader ? (
                <div className="container mx-auto h-full grid items-center">
                    <Spinner />
                </div>
            ) : (
                <>
                    {challenges.length > 0 ? (
                        <Challenge challenges={challenges} />
                    ) : (
                        <div className="container mx-auto h-full">
                            <div className="h-full w-full">
                                <div className="relative">
                                    <Image src={ICONS.ProfileBg} />
                                    {privyAddress && (
                                        <Image
                                            className="rounded-full w-[86px] absolute -bottom-8 left-[-2px]"
                                            width={86}
                                            height={86}
                                            src={getNounAvatar(privyAddress)}
                                        />
                                    )}
                                </div>

                                <div className="mt-10 mb-11">
                                    <p className="paragraph_regular text-black mb-7">
                                        Hey there!
                                    </p>

                                    <h2 className="heading2_bold mb-2 pr-[100px]">
                                        Looks like there are no challenges
                                    </h2>
                                    <p className="paragraph_regular mb-5 pr-[120px]">
                                        Set a goal and challenge your friends to complete
                                        them & Grow together !
                                    </p>
                                    <Button
                                        variant={"primary"}
                                        disabled={disableBtn}
                                        onClick={() => navigate("create-challenge")}
                                    >
                                        Create a challenge
                                    </Button>
                                </div>
                                <div className="mb-10">
                                    <Image src={ICONS.ethereum} className="mb-2" />
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="paragraph_regular">Your balance</p>
                                        <p className="paragraph_bold text-black">
                                            {trimAddress(privyAddress, 4)}
                                        </p>
                                        {showcopyText ? (
                                            <p className="paragraph_bold text-black">
                                                {"Copied!"}
                                            </p>
                                        ) : (
                                            <Image
                                                className="cursor-pointer"
                                                src={ICONS.copyBlack}
                                                onClick={handleCopy}
                                                alt="copy_icon"
                                            />
                                        )}
                                    </div>
                                    <p className="paragraph_bold text-black mb-1">{`${bal} ETH ($${usdValue})`}</p>
                                    {!bal && (
                                        <div className="mt-5">
                                            <InputField
                                                inputMode="decimal"
                                                type="text"
                                                className={``}
                                                onChange={(e) => {
                                                    handleDepositInputChange(
                                                        e.target.value,
                                                    );
                                                }}
                                                placeholder={"$0"}
                                                value={depositValue}
                                                showClose={false}
                                            />
                                            <Button
                                                variant={"primary"}
                                                label={
                                                    transactionLoading || isLoading
                                                        ? "Depositting..."
                                                        : "Deposit"
                                                }
                                                onClick={() => {
                                                    isConnected
                                                        ? handleDepositClick()
                                                        : open();
                                                }}
                                                className="w-full mt-3"
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    Deposit via Wallet Connect
                                                </div>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
