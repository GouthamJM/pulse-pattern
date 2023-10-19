import { useRouter } from "next/router";

const { default: userChallenges } = require("@/utils/hooks/api/userChallenges");

export default function ChallengeDetail() {
    const router = useRouter();
    const {} = userChallenges();
    return <></>;
}
