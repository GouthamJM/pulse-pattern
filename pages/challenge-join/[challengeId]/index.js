import { customPulsePatternContract } from "@/contract";
import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import withAuth from "@/hocs/withAuth";
import { ChallengeListItem } from "@/ui_components/challenges";
import { BackBtn, Button } from "@/ui_components/shared";
import { getTokenFormattedNumber, hexToNumber } from "@/utils";
import { getBalance, getUsdPrice } from "@/utils/apiservices";
import userChallengeDetail from "@/utils/hooks/api/useChallengeDetail";
import usePrivyClient from "@/utils/hooks/wallet/usePrivyClient";
import usePrivyWalletDetail from "@/utils/hooks/wallet/usePrivyWalletDetail";
import { ICONS } from "@/utils/images";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { polygonZkEvmTestnet, scrollSepolia } from "viem/chains";

const CHALLENGE_DETAIL = {
    accept: "challenge-accept",
    deposit: "challenge-deposit",
};

function JoinChallenge() {
    const router = useRouter();
    const { privyClient } = usePrivyClient();
    const { walletDetail } = usePrivyWalletDetail();
    const privyAddress = walletDetail?.address;
    const { challenge } = userChallengeDetail(router?.query?.challengeId);
    const [tab, setTab] = useState(CHALLENGE_DETAIL.accept);

    const [bal, setBal] = useState("");
    const [usdValue, setUsdValue] = useState("");
    const fetchBalance = async (address) => {
        getUsdPrice()
            .then(async (res) => {
                const chains = [scrollSepolia, polygonZkEvmTestnet];

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
                setBal(formattedNumber);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (privyAddress) {
            fetchBalance(privyAddress);
        }
    }, [privyAddress]);

    const depositToChainAndStartChallenge = async () => {
        const challengeStatus = await customPulsePatternContract(
            privyClient,
        ).addUserToChallenge(
            BigInt(router?.query?.challengeId),
            parseEther(challenge.amountToBeStaked),
        );
        console.log(challengeStatus, "challengeStatus");
        // router.push(`/challenge/${router?.query?.challengeId}`);
    };
    return (
        <section className="relative h-[calc(100dvh-64px)] pt-4">
            <div className="container mx-auto h-auto relative">
                <div className="h-full w-full">
                    <BackBtn className="mb-2" />
                    {tab === CHALLENGE_DETAIL.accept && (
                        <>
                            <h2 className="heading2_bold mb-6 italic">
                                Challenge received !
                            </h2>
                            {challenge && (
                                <ChallengeListItem
                                    {...challenge}
                                    className={"bg-black"}
                                    acceptedUser={challenge?.challengeCreatorAddress}
                                />
                            )}
                            <p className="paragraph_regular mb-5 p-4">
                                * If you fail to complete the challenge this amount will
                                be deducted from your balance
                            </p>
                        </>
                    )}

                    {tab === CHALLENGE_DETAIL.deposit && (
                        <>
                            <h2 className="heading2_bold mb-6">Add a joining amount</h2>
                            <Image src={ICONS.ethereum} className="mb-2" />
                            <p className="heading2_bold text-black mb-1">{`${challenge?.amountToBeStaked} ETH`}</p>
                            <div className="paragraph_regular mb-5 bg-grey3 px-4 py-2 rounded-xl mt-4">
                                Balance : {bal} ETH (${usdValue})
                            </div>
                            <p className="paragraph_regular">
                                * If you fail to complete the challenge this amount will
                                be deducted from your balance
                            </p>
                        </>
                    )}
                </div>
            </div>
            {tab === CHALLENGE_DETAIL.accept && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <Button
                        variant={"primary"}
                        className="bg-green w-[300px]"
                        onClick={() => {
                            setTab(CHALLENGE_DETAIL.deposit);
                        }}
                    >
                        Accept
                    </Button>
                </div>
            )}

            {tab === CHALLENGE_DETAIL.deposit && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <Button
                        variant={"primary"}
                        className="bg-black w-[300px]"
                        onClick={() => {
                            depositToChainAndStartChallenge();
                        }}
                    >
                        Deposit
                    </Button>
                </div>
            )}
        </section>
    );
}

export default withAuth(PageLayoutHoc(JoinChallenge, { showHeader: true }));
