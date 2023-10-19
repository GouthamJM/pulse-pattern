import { ChallengesInfo, Greet } from ".";

export default function GreetBlk() {
    return (
        <div className="container mx-auto h-full">
            <div className="pt-4">
                <Greet />
            </div>
            <div className="mt-8">
                <ChallengesInfo />
            </div>
        </div>
    );
}
