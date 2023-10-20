import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import { NavLink } from "@/ui_components/shared";
import { InviteList } from "@/ui_components/messages";
import withAuth from "@/hocs/withAuth";

function Messages() {
    return (
        <div className="container mx-auto h-full">
            <div className="h-full w-full">
                <div className="flex items-center justify-between py-6">
                    <h1 className="heading1_bold">Chat</h1>
                </div>
                <InviteList />
            </div>
        </div>
    );
}

export default withAuth(PageLayoutHoc(Messages));
