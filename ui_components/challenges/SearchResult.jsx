import { ICONS } from "@/utils/images";
import { Button } from "../shared";
import { getNounAvatar, trimAddress } from "@/utils";
import Image from "next/image";
import { useCopyToClipboard } from "@/utils/hooks/useCopyToClipboard";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    xmtpMessagingService,
    customXMTPMessagingService,
} from "@/contract/xmtpProtocol";

const SearchResult = ({ handleUpdateStep, avatar, address, displayName }) => {
    const [, copy] = useCopyToClipboard();

    const handleInviteUser = async () => {
        try {
            const res = await xmtpMessagingService.sendXMTPMessage(address);
            // handleUpdateStep("status");
            console.log(res, "first user message");
        } catch (err) {
            console.log("xmpt error", err);
        }
    };

    return (
        <div className="bg-white border border-grey2 rounded-4xl relative mb-5">
            <div className="relative">
                <Image className="rounded-t-4xl" src={ICONS.SearchResultBg} />
                <Image
                    className="rounded-full w-[74px] absolute -bottom-8 left-1/2 -translate-x-1/2"
                    src={avatar ? avatar : getNounAvatar(address)}
                    width={74}
                    height={74}
                />
            </div>
            <div className="text-center px-5 py-5">
                <p className="paragraph_bold text-black mt-5 mb-8">{displayName}</p>
                <div className="paragraph_bold text-black mt-5 mb-8 relative">
                    {trimAddress(address)}{" "}
                    <Image
                        src={ICONS.copyGray}
                        alt="copy gray"
                        onClick={() => copy(address)}
                        className=" inline cursor-pointer"
                    />
                </div>

                <Button
                    variant={"primary"}
                    label="Invite by Push protocol"
                    onClick={() => handleInviteUser()}
                />
            </div>
        </div>
    );
};

export default SearchResult;
