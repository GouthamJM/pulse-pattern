import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import withAuth from "@/hocs/withAuth";
import {
    ChallengeDepositForm,
    Invite,
    InviteStatus,
    ChallengeStepForm,
} from "@/ui_components/challenges";
import { useState } from "react";

export const CHALLENGE_COMP = {
    stepAndDuration: "stepAndDuration",
    stakeAndCreateChallenge: "stakeAndCreateChallenge",
    inviteForChallenge: "inviteForChallenge",
    invitationStatus: "invitationStatus",
};
function Challenges() {
    const [challengeForm, setChallengeForm] = useState({
        steps: "",
        distance: "",
        duration: "",
        deposit: "",
    });

    const [challengeId, setChallengeId] = useState("");
    const [challenges, setChallenges] = useState(CHALLENGE_COMP.stepAndDuration);

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
            case CHALLENGE_COMP.stepAndDuration:
                return (
                    <ChallengeStepForm
                        challengeForm={challengeForm}
                        handleUpdateStep={handleUpdateStep}
                        handleUpdateForm={handleUpdateForm}
                    />
                );
            case CHALLENGE_COMP.stakeAndCreateChallenge:
                return (
                    <ChallengeDepositForm
                        challengeForm={challengeForm}
                        handleUpdateStep={handleUpdateStep}
                        handleUpdateForm={handleUpdateForm}
                        setChallengeId={setChallengeId}
                    />
                );
            case CHALLENGE_COMP.inviteForChallenge:
                return (
                    <Invite
                        challengeForm={challengeForm}
                        handleUpdateStep={handleUpdateStep}
                        handleUpdateForm={handleUpdateForm}
                        challengeId={challengeId}
                    />
                );
            case CHALLENGE_COMP.invitationStatus:
                return <InviteStatus />;
        }
    };

    return <>{getChallengeSteps(challenges)}</>;
}

export default PageLayoutHoc(Challenges);
