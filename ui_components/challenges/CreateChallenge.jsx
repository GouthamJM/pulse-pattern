import { useEffect, useState } from "react";
import { BackBtn, Button, InputField } from "@/ui_components/shared";
import { getFromLocalStorage, getTokenFormattedNumber } from "@/utils";

import { getBalance, getUsdPrice } from "@/utils/apiservices";
import { hexToNumber } from "viem";
import { ICONS } from "@/utils/images";
import Image from "next/image";

const CreateChallenge = ({ handleUpdateStep }) => {
    const [inputValue, setInputValue] = useState("");
    const [bal, setBal] = useState("");

    const handleInputChange = (val) => {
        if (/^\d*\.?\d*$/.test(val) || val === "") {
            const numericValue = parseFloat(val);
            if (!isNaN(numericValue)) {
                if (numericValue <= 100000) {
                    setInputValue(val);
                }
            } else {
                setInputValue("");
            }
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

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
                const formatBal = (
                    (hexToNumber(balance.result) / Math.pow(10, 18)) *
                    res.data.ethereum.usd
                ).toFixed(3);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <section className="relative h-full">
            <div className="container mx-auto h-full">
                <div className="h-full w-full">
                    <div className="pt-4">
                        <BackBtn className="mb-2" />
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
                        </div>
                        <div>
                            <div className="rounded-large bg-grey3 px-5 flex items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <Image src={ICONS.ethereum} className="w-5 h-5" />
                                    {/* <p className="paragraph_regular text-black">0.02</p> */}
                                    <InputField
                                        inputMode="decimal"
                                        type="text"
                                        className={``}
                                        onChange={(e) => {
                                            handleInputChange(e.target.value);
                                        }}
                                        value={inputValue}
                                        showClose={false}
                                    />
                                </div>
                                <div className="absolute right-8">
                                    <p className="paragraph_regular">ETH</p>
                                </div>
                            </div>
                            <div className="rounded-large border border-grey2 px-5 py-[14px] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="paragraph_regular">Reward pool</p>
                                    <Image src={ICONS.helpCircle} className="w-4 h-4" />
                                </div>
                                <p className="paragraph_regular text-black">0.04 ETH</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-12 w-[380px] left-1/2 -translate-x-1/2">
                <Button
                    variant={"primary"}
                    onClick={() => handleUpdateStep("invite")}
                    className="w-full"
                >
                    <div className="flex items-center justify-center gap-2">
                        Create challenge
                        <Image src={ICONS.arrowRightWhite} />
                    </div>
                </Button>
            </div>
        </section>
    );
};

export default CreateChallenge;
