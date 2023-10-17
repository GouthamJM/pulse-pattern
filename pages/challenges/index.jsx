import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import withAuth from "@/hocs/withAuth";
import {
    CreateChallenge,
    Invite,
    InviteStatus,
    NewChallenge,
} from "@/ui_components/challenges";
import { useState } from "react";

function Challenges() {
    const [challenges, setChallenges] = useState("newChallenge");

    const handleUpdateStep = (type) => {
        setChallenges(type);
    };

    const getChallengeSteps = (challenges) => {
        switch (challenges) {
            case "newChallenge":
                return <NewChallenge handleUpdateStep={handleUpdateStep} />;
            case "createChallenge":
                return <CreateChallenge handleUpdateStep={handleUpdateStep} />;
            case "invite":
                return <Invite handleUpdateStep={handleUpdateStep} />;
            case "status":
                return <InviteStatus />;
        }
    };

    return <>{getChallengeSteps(challenges)}</>;
}

export default PageLayoutHoc(Challenges);
