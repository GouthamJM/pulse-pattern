import { ChallengeListItem } from ".";

export default function ChallengeList() {
    return (
        <div className="container mx-auto pt-6">
            <p className="paragraph_bold text-black mb-3">Challenge</p>
            <div className="grid xl:grid-cols-3 grid-cols-1 gap-3">
                <ChallengeListItem />
                <ChallengeListItem />
            </div>
        </div>
    );
}
