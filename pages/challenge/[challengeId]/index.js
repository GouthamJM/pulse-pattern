import { Challenge } from "@/ui_components/challenges";
import userChallengeDetail from "@/utils/hooks/api/useChallengeDetail";
import { useRouter, useParams } from "next/router";

export default function ChallengeDetail() {
    const router = useRouter();
    const params = useParams();

    const { challenge, userChallengeDetail } = userChallengeDetail(params.challengeId);
    return <div>Challenge Detail</div>;
}
