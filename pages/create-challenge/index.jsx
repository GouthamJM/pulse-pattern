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
    const [challengeForm, setChallengeForm] = useState({
        steps: "",
        duration: "",
        deposit: "",
    });
    const [challenges, setChallenges] = useState("newChallenge");

    const handleUpdateStep = (type) => {
        setChallenges(type);
    };

    const handleUpdateForm = (newForm) => {
        setChallengeForm((prev) => {
            return { ...prev, ...newForm };
        });
    };

    const getChallengeSteps = (challenges) => {
        switch (challenges) {
            case "newChallenge":
                return (
                    <NewChallenge
                        handleUpdateStep={handleUpdateStep}
                        handleUpdateForm={handleUpdateForm}
                    />
                );
            case "createChallenge":
                return (
                    <CreateChallenge
                        handleUpdateStep={handleUpdateStep}
                        handleUpdateForm={handleUpdateForm}
                    />
                );
            case "invite":
                return (
                    <Invite
                        handleUpdateStep={handleUpdateStep}
                        handleUpdateForm={handleUpdateForm}
                    />
                );
            case "status":
                return <InviteStatus />;
        }
    };

    return <>{getChallengeSteps(challenges)}</>;
}

export default PageLayoutHoc(Challenges);
