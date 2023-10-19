import userChallengeDetail from "@/utils/hooks/api/useChallengeDetail";
import { useRouter, useParams } from "next/router";

export default function ChallengeDetail() {
    const router = useRouter();
    const params = useParams();

    const { challenge } = userChallengeDetail(params.challengeId);
    console.log(challenge, "challenge");
    return <></>;
}
