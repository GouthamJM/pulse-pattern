import { ICONS } from "@/utils/images";
import Image from "next/image";

const InviteMessage = () => {
    return (
        <div className="inviteMessage flex justify-end">
            <div className="chatBubble bg-[#0d7df2] rounded-t-2xl rounded-bl-2xl rounded-br-md px-3 py-2 text-center">
                <Image src={ICONS.handEmoji} />
                <p className="paragraph_medium text-white">Chat invite</p>
                <p className="supportText_regular text-white">pending</p>
            </div>
        </div>
    );
};
export default InviteMessage;
