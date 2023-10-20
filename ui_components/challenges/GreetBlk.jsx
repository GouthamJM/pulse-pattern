import { ChallengesInfo, Greet } from ".";

export default function GreetBlk({ challengesDetail }) {
    return (
        <div className="container mx-auto h-full">
            <div className="pt-4">
                <Greet />
            </div>
            <div className="mt-8">
                <ChallengesInfo challengesDetail={challengesDetail} />
            </div>
        </div>
    );
}
