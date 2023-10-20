import { pulsePatternContractService } from "@/contract";
import { useEffect, useState } from "react";

export default function userChallenges(address) {
    const [challenges, setAllChallenges] = useState([]);
    const [userChallengeLoader, setUserChallengeLoader] = useState(false);

    useEffect(() => {
        (async () => {
            if (address) {
                setUserChallengeLoader(true);
                const challenges = await pulsePatternContractService.getUserChallenges(
                    address,
                );
                let allChallengesResult = await Promise.allSettled(
                    challenges.map((item) =>
                        pulsePatternContractService.getChallenge(item, address),
                    ),
                );

                allChallengesResult = allChallengesResult
                    ?.filter((res) => res.status === "fulfilled")
                    ?.map((res) => res.value);

                setUserChallengeLoader(false);
                setAllChallenges(allChallengesResult);
            }
        })();
    }, [address]);

    return { challenges, userChallengeLoader };
}
