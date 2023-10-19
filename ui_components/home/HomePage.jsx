import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, InputField } from "@/ui_components/shared";
import {
    getFromLocalStorage,
    getTokenFormattedNumber,
    getNounAvatar,
    trimAddress,
    copyToClipBoard,
} from "@/utils";

import { getBalance, getUsdPrice } from "@/utils/apiservices";
import { hexToNumber } from "viem";
import { ICONS } from "@/utils/images";
import { useWeb3Modal } from "@web3modal/react";
import Image from "next/image";
import {
    useAccount,
    useSendTransaction,
    useWaitForTransaction,
    usePrepareSendTransaction,
} from "wagmi";
import UserChallenges from "./UserChallenges";

export default function HomePage() {
    const router = useRouter();
    const navigate = router.push;
    const [bal, setBal] = useState("");
    const { open } = useWeb3Modal();
    const [tokenPrice, setTokenPrice] = useState("");
    const [depositValue, setDepositValue] = useState("");
    const [depositInputValue, setDepositInputValue] = useState("");
    const [transactionLoading, setTransactionLoading] = useState(false);
    const { address, isConnecting, isConnected } = useAccount();
    const add = getFromLocalStorage("address");
    const toAmount = Number(depositInputValue) * Math.pow(10, 18);
    const { config } = usePrepareSendTransaction({
        to: add,
        value: Math.round(toAmount),
    });
    const { data, sendTransaction, status } = useSendTransaction(config);
    const { isLoading, isSuccess, error } = useWaitForTransaction({
        hash: data?.hash,
    });

    const [disableBtn, setDisableBtn] = useState(true);
    const [usdValue, setUsdValue] = useState("");
    const [showcopyText, setShowCopyText] = useState(false);

    const proImg = getFromLocalStorage("address");

    useEffect(() => {
        fetchBalance();
    }, [add]);

    const fetchBalance = async () => {
        const address = getFromLocalStorage("address");
        getUsdPrice()
            .then(async (res) => {
                const balance = await getBalance(address);
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
        copyToClipBoard(add);
        setShowCopyText(true);
        setTimeout(() => {
            setShowCopyText(false);
        }, 2000);
    };

    useEffect(() => {
        if (!isLoading && isSuccess) {
            setTransactionLoading(false);
            fetchBalance();
        } else if (error) {
            setTransactionLoading(false);
            console.log("error", error);
        }
    }, [isSuccess, error, status]);

    return (
        <section className="mt-4 h-full bg-white overflow-y-auto hide-scrollbar">
            <div className="container mx-auto h-full">
                <div className="h-full w-full">
                    <div className="relative">
                        <Image src={ICONS.ProfileBg} />
                        {proImg && (
                            <Image
                                className="rounded-full w-[86px] absolute -bottom-8 left-[-2px]"
                                width={86}
                                height={86}
                                src={getNounAvatar(proImg)}
                            />
                        )}
                    </div>

                    <div className="mt-10 mb-11">
                        <p className="paragraph_regular text-black mb-7">Hey there!</p>

                        <h2 className="heading2_bold mb-2 pr-[100px]">
                            Looks like there are no challenges
                        </h2>
                        <p className="paragraph_regular mb-5 pr-[120px]">
                            Set a goal and challenge your friends to complete them & Grow
                            together !
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
                                {trimAddress(add, 4)}
                            </p>
                            {showcopyText ? (
                                <p className="paragraph_bold text-black">{"Copied!"}</p>
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
                        <div className="mt-5">
                            <InputField
                                inputMode="decimal"
                                type="text"
                                className={``}
                                onChange={(e) => {
                                    handleDepositInputChange(e.target.value);
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
                                    isConnected ? handleDepositClick() : open();
                                }}
                                className="w-full mt-3"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    Deposit
                                </div>
                            </Button>
                        </div>
                    </div>
                    {/* <div className="pb-10">
                        <div className="p-5 border border-grey2 rounded-4xl">
                            <Image className="w-6 h-6 mb-2" src={ICONS.connectIcon} />
                            <p className="paragraph_regular text-black mb-[14px]">
                                Link your Strava account to track <br /> accurately
                            </p>
                            <Button
                                variant={"ghost"}
                                disabled={
                                    typeof isStravaConnected === "boolean" &&
                                    isStravaConnected
                                        ? true
                                        : false
                                }
                            >
                                <a
                                    href={
                                        typeof isStravaConnected === "boolean" &&
                                        isStravaConnected
                                            ? ""
                                            : stravaRedirectUrl
                                    }
                                >
                                    {typeof isStravaConnected === "boolean" &&
                                    isStravaConnected
                                        ? "Connected"
                                        : "Connect"}
                                </a>
                            </Button>
                        </div>
                    </div> */}
                </div>
                <UserChallenges />
            </div>
        </section>
    );
}
