import { ChallengeListItem } from ".";

export default function ChallengeList({ challengesDetail }) {
    console.log(challengesDetail, "challengesDetail");
    return (
        <div className="container mx-auto pt-6">
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
