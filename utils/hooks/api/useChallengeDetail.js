import { pulsePatternContractService } from "@/contract";
import { useEffect, useState } from "react";

export default function userChallengeDetail(challengeId) {
    const [challenge, setChallenge] = useState();

    useEffect(() => {
        (async () => {
            const challenge = await pulsePatternContractService.getChallenge(challengeId);
            setChallenge(challenge);
        })();
    }, []);

    return { challenge };
}
