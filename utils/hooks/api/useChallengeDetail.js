import { pulsePatternContractService } from "@/contract";
import { useEffect, useState } from "react";
import usePrivyWalletDetail from "../wallet/usePrivyWalletDetail";

export default function userChallengeDetail(challengeId) {
    const { walletDetail } = usePrivyWalletDetail();
    const [challenge, setChallenge] = useState();
    useEffect(() => {
        (async () => {
            if (challengeId && walletDetail?.address) {
                const challenge = await pulsePatternContractService.getChallenge(
                    BigInt(challengeId),
                    walletDetail.address,
                );
                setChallenge(challenge);
            }
        })();
    }, [challengeId, walletDetail?.address]);

    return { challenge };
}
