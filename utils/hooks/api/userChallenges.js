import { pulsePatternContractService } from "@/contract";
import { useEffect, useState } from "react";

export default function userChallenges() {
    const [challenges, setAllChallenges] = useState([]);

    useEffect(() => {
        (async () => {
            const challenges = await pulsePatternContractService.getUserChallenges(
                process.env.NEXT_PUBLIC_EOA_PUBLIC_KEY,
            );
            let allChallengesResult = await Promise.allSettled(
                challenges.map((item) => pulsePatternContractService.getChallenge(item)),
            );

            allChallengesResult = allChallengesResult
                ?.filter((res) => res.status === "fulfilled")
                ?.map((res) => res.value);

            console.log(allChallengesResult, "allChallengesResult");
            setAllChallenges(allChallengesResult);
        })();
    }, []);

    return { challenges };
}
