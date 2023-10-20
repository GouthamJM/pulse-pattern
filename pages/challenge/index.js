import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import withAuth from "@/hocs/withAuth";
import { Challenge } from "@/ui_components/challenges";

function AllUserChallenges() {
    return <Challenge />;
}

export default withAuth(PageLayoutHoc(AllUserChallenges, { showHeader: true }));
