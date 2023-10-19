import { pulsePatternContractService } from "@/contract";
import userChallenges from "@/utils/hooks/api/userChallenges";
import { useEffect, useState } from "react";

export default function UserChallenges() {
    const { challenges } = userChallenges();

    useEffect(() => {
        console.log(challenges, "challenges");
    }, [challenges]);
    return (
        <div>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}
