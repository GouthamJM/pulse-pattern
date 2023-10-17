import { NavLink } from "@/ui_components/shared";
import { getNounAvatar, trimAddress } from "@/utils";

const InviteList = () => {
    return (
        <NavLink
            to="chat"
            className="flex items-center justify-between p-3 bg-white rounded-xl"
        >
            <div className="flex items-center gap-2">
                <img
                    src={getNounAvatar("0xD322A0bd6A139cFd359F1EFC540F6cb358d73A16")}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="paragraph_bold">
                        {trimAddress("0xD322A0bd6A139cFd359F1EFC540F6cb358d73A16", 5)}
                    </p>
                    <p className="supportText_medium">Invite pending</p>
                </div>
            </div>
            <p className="supportText_regular text-gray-400">15:30</p>
        </NavLink>
    );
};

export default InviteList;
