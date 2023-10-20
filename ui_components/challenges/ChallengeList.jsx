import { useRouter } from "next/router";
import { ChallengeListItem } from ".";
import { Button } from "../shared";

export default function ChallengeList({ challengesDetail }) {
    const router = useRouter();
    const navigate = router.push;

    return (
        <div className="container mx-auto pt-6">
            <div className="flex justify-between pb-4">
                <div className="col-span-6">
                    <p className="paragraph_bold text-black mb-3">Challenge</p>
                </div>
                <div className="col-span-6">
                    <Button
                        variant={"primary"}
                        onClick={() => navigate("create-challenge")}
                        className={"h-6 text-sm bg-green2"}
                    >
                        + Create Challenge
                    </Button>
                </div>
            </div>

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
