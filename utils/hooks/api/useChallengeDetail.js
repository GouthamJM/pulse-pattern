import { pulsePatternContractService } from "@/contract";
import { useEffect, useState } from "react";

export default function userChallengeDetail() {
    const [challenge, setChallenge] = useState();

    useEffect(() => {
        (async () => {
            const challenge = await pulsePatternContractService.getChallenge(item);
            setChallenge(challenge);
        })();
    }, []);

    return { challenge };
}
