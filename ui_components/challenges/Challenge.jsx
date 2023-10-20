import { useMemo } from "react";
import { GreetBlk, ChallengeList } from ".";
import { Spacer } from "../shared";
import { checkIfDateIsValid } from "@/utils";

export default function Challenge({ challenges }) {
    const challengesDetail = useMemo(() => {
        const activeChallenges = [];
        const achievedChallenges = [];
        const failedChallenges = [];
        challenges.forEach((challenge) => {
            if (challenge) {
                if (checkIfDateIsValid(challenge?.expiryDate)) {
                    activeChallenges.push(challenge);
                } else {
                    if (challenge.totalWinners !== challenge.userAddress) {
                        failedChallenges.push(challenge);
                    } else {
                        achievedChallenges.push(challenge);
                    }
                }
            }
        });
        return {
            activeChallenges: {
                list: activeChallenges,
                count: activeChallenges.length,
            },
            achievedChallenges: {
                list: achievedChallenges,
                count: achievedChallenges.length,
            },
            failedChallenges: {
                list: failedChallenges,
                count: failedChallenges.length,
            },
            total: challenges.length,
        };
    }, [challenges]);

    return (
        <section className="overflow-clip bg-white relative">
            <GreetBlk challengesDetail={challengesDetail} />
            <Spacer />
            <ChallengeList challengesDetail={challengesDetail} />
        </section>
    );
}
