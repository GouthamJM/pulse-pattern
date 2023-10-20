import { useRouter } from "next/router";
import { ChallengeListItem } from ".";
import { Button, InputField } from "../shared";
import { useState } from "react";

export default function ChallengeList({ challengesDetail }) {
    const router = useRouter();
    const navigate = router.push;
    const [joinById, setJoinById] = useState(false);
    const [challengeId, setChallengeId] = useState("");
    return (
        <div className="container mx-auto pt-6">
            <div className="flex justify-between pb-4">
                <div className="col-span-6">
                    {joinById ? (
                        <div className="flex gap-2">
                            <InputField
                                className={"w-[160px]"}
                                value={challengeId}
                                onChange={(e) => setChallengeId(e.target.value)}
                                inputClassName={"h-[40px]"}
                                placeholder={"Challenge ID"}
                            />
                            <Button
                                variant={"secondary"}
                                onClick={() => navigate("create-challenge")}
                                className={"h-10 text-sm bg-green text-black "}
                            >
                                Join
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant={"ghost"}
                            onClick={() => setJoinById(true)}
                            className={"h-10 text-sm bg-green2"}
                        >
                            Join by Challenge ID
                        </Button>
                    )}
                </div>
                <div className="col-span-6">
                    {!joinById && (
                        <Button
                            variant={"secondary"}
                            onClick={() => navigate("create-challenge")}
                            className={"h-10 text-sm bg-green text-black"}
                        >
                            + Create Challenge
                        </Button>
                    )}
                </div>
            </div>
            <p className="paragraph_bold text-black mb-3">Challenge</p>

            <div className="grid xl:grid-cols-1 grid-cols-1 gap-3">
                {challengesDetail?.activeChallenges?.list?.map((challenge) => (
                    <ChallengeListItem
                        {...challenge}
                        key={challenge.challengeId}
                        className={"bg-black"}
                    />
                ))}
                {challengesDetail?.achievedChallenges?.list?.map((challenge) => (
                    <ChallengeListItem
                        {...challenge}
                        key={challenge.challengeId}
                        className={"bg-green2"}
                    />
                ))}
                {challengesDetail?.failedChallenges?.list?.map((challenge) => (
                    <ChallengeListItem
                        {...challenge}
                        key={challenge.challengeId}
                        className={"bg-red2"}
                    />
                ))}
            </div>
        </div>
    );
}
