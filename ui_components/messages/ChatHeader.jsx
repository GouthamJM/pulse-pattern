import { NavLink } from "@/ui_components/shared";
import { getNounAvatar, trimAddress } from "@/utils";
import { ICONS } from "@/utils/images";
import Image from "next/image";

const ChatHeader = () => {
    return (
        <div className="sticky top-[60px] flex items-center p-3 bg-white z-30">
            <div className="flex items-center gap-3">
                <NavLink to="" goBack>
                    <Image className="rotate-90" src={ICONS.arrowDown} />
                </NavLink>
                <div className="flex items-center gap-2">
                    <img
                        src={getNounAvatar("0xD322A0bd6A139cFd359F1EFC540F6cb358d73A16")}
                        className="w-10 h-10 rounded-full"
                    />

                    <p className="paragraph_bold">
                        {trimAddress("0xD322A0bd6A139cFd359F1EFC540F6cb358d73A16", 5)}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ChatHeader;
