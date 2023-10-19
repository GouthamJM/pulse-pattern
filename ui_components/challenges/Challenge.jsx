import { GreetBlk, ChallengeList } from ".";
import { Spacer } from "../shared";

export default function Challenge() {
    return (
        <section className="overflow-clip bg-white relative">
            <GreetBlk />
            <Spacer />
            <ChallengeList />
        </section>
    );
}
