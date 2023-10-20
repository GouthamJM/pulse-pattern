import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import withAuth from "@/hocs/withAuth";
import { LiveChallenge } from "@/ui_components/challenges";
import userChallengeDetail from "@/utils/hooks/api/useChallengeDetail";
import { useRouter } from "next/router";

function ChallengeDetail() {
    const router = useRouter();
    const { challenge } = userChallengeDetail(router?.query?.challengeId);
    return <LiveChallenge challenge={challenge} />;
}

export default withAuth(PageLayoutHoc(ChallengeDetail, { showHeader: true }));
