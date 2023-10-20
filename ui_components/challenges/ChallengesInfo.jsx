export default function ChallengesInfo({ challengesDetail }) {
    return (
        <div className="flex items-start justify-between mb-6">
            <div>
                <p className="paragraph_bold">{challengesDetail.total} </p>
                <p className="paragraph_regular">Total</p>
            </div>
            <div>
                <p className="paragraph_bold">
                    {challengesDetail?.activeChallenges?.count}{" "}
                </p>
                <p className="paragraph_regular">Active</p>
            </div>
            <div>
                <p className="paragraph_bold">
                    {challengesDetail?.achievedChallenges?.count}{" "}
                </p>
                <p className="paragraph_regular">Achieved</p>
            </div>
            <div>
                <p className="paragraph_bold">
                    {challengesDetail?.failedChallenges?.count}{" "}
                </p>
                <p className="paragraph_regular">Failed</p>
            </div>
            <div>
                <p className="paragraph_bold">21 </p>
                <p className="paragraph_regular">Balance</p>
            </div>
        </div>
    );
}
