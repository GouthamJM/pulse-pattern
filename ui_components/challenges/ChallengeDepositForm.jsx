import { useEffect, useMemo, useState } from "react";
import { BackBtn, Button, InputField } from "@/ui_components/shared";
import { getFromLocalStorage, getTokenFormattedNumber } from "@/utils";

import { getBalance, getUsdPrice } from "@/utils/apiservices";
import { hexToNumber, parseEther } from "viem";
import { ICONS } from "@/utils/images";
import Image from "next/image";
import { customAlphabet } from "nanoid";
import { CHALLENGE_COMP } from "@/pages/create-challenge";
import { customPulsePatternContract, pulsePatternContractService } from "@/contract";
import dayjs from "dayjs";
import Spinner from "../shared/Spinner";
import usePrivyClient from "@/utils/hooks/wallet/usePrivyClient";

const nanoid = customAlphabet("1234567890", 9);
const ChallengeDepositForm = ({
    handleUpdateStep,
    challengeForm,
    handleUpdateForm,
    setChallengeId,
}) => {
    const { privyClient } = usePrivyClient();
    const [bal, setBal] = useState("");
    const [tokenPrice, setTokenPrice] = useState("");
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        fetchBalance();
    }, []);

    const buttonDisabled = useMemo(() => {
        return !challengeForm.deposit;
    }, [challengeForm]);

    const fetchBalance = async () => {
        const address = getFromLocalStorage("address");
        getUsdPrice()
            .then(async (res) => {
                const balance = await getBalance(address);
                const formattedNumber = getTokenFormattedNumber(
                    hexToNumber(balance.result),
                    18,
                );
                setBal(formattedNumber);
                setTokenPrice(res.data.ethereum.usd);
                const formatBal = (
                    (hexToNumber(balance.result) / Math.pow(10, 18)) *
                    res.data.ethereum.usd
                ).toFixed(3);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getNextDateUnix = (_days) => {
        const _date = dayjs().add(_days, "day").unix();
        return _date;
    };
    const handleCreateChallenge = async () => {
        setLoader(true);
        if (challengeForm) {
            const [_challengeId, _expiryDate, _betAmount, _target, _isPublicChallenge] = [
                Number(nanoid()),
                getNextDateUnix(challengeForm.duration),
                parseEther(challengeForm.deposit),
                challengeForm.steps,
                [],
                false,
            ];
            setChallengeId(_challengeId);
            const challengeStatus = await customPulsePatternContract(
                privyClient,
            ).createChallenge(
                _challengeId,
                _expiryDate,
                _betAmount,
                _target,
                _isPublicChallenge,
            );
            console.log(challengeStatus, "challengeStatus");
            setLoader(false);
            handleUpdateStep(CHALLENGE_COMP.inviteForChallenge);
        } else {
        }
    };

    return (
        <section className="relative h-full">
            <div className="container mx-auto h-full">
                <div className="h-full w-full">
                    <div className="pt-4">
                        <BackBtn
                            className="mb-2"
                            onClick={() =>
                                handleUpdateStep(CHALLENGE_COMP.stepAndDuration)
                            }
                        />
                        <h2 className="heading2_bold mb-4">
                            How much is the reward <br /> for the challenge?
                        </h2>
                        <p className="paragraph_regular mb-[70px]">
                            * If you fail to complete the challenge this amount will be
                            deducted from your balance
                        </p>
                        <div className="mb-10">
                            <Image src={ICONS.ethereum} className="mb-2" />
                            <p className="paragraph_regular mb-1">Your balance</p>
                            <p className="paragraph_bold text-black mb-1">{`${bal} ETH`}</p>
                            {/* <div className="mt-5">
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
                            </div> */}
                        </div>
                        <div>
                            <div className="rounded-large bg-grey3 px-5 flex items-center mb-4">
                                <div className="flex items-center gap-2 w-full">
                                    <Image src={ICONS.ethereum} className="w-5 h-5" />

                                    <InputField
                                        inputMode="decimal"
                                        type="number"
                                        className={`w-full`}
                                        onChange={(e) => {
                                            handleUpdateForm({ deposit: e.target.value });
                                        }}
                                        step={0.001}
                                        min={0.001}
                                        value={challengeForm.deposit}
                                        showClose={false}
                                    />
                                </div>
                                <div className="absolute right-8">
                                    <p className="paragraph_regular">ETH</p>
                                </div>
                            </div>
                            {/* <div className="rounded-large border border-grey2 px-5 py-[14px] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="paragraph_regular">Reward pool</p>
                                    <Image src={ICONS.helpCircle} className="w-4 h-4" />
                                </div>
                                <p className="paragraph_regular text-black">0.04 ETH</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`fixed bottom-12 w-[380px] left-1/2 -translate-x-1/2 ${
                    buttonDisabled ? "disabled cursor-not-allowed" : ""
                }`}
            >
                <Button
                    variant={"primary"}
                    onClick={() => handleCreateChallenge()}
                    className="w-full"
                >
                    <div className="flex items-center justify-center gap-2">
                        {loader ? "Creating..." : "Create challenge"}
                        {loader ? <Spinner /> : <Image src={ICONS.arrowRightWhite} />}
                    </div>
                </Button>
            </div>
        </section>
    );
};

export default ChallengeDepositForm;
