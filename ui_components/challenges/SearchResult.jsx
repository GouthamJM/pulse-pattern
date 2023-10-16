import { ICONS } from "@/utils/images";
import { Button } from "../shared";
import { getNounAvatar } from "@/utils";
import Image from "next/image";

const SearchResult = ({ handleUpdateStep, name, address }) => {
    return (
        <div className="bg-white border border-grey2 rounded-4xl relative mb-5">
            <div className="relative">
                <Image className="rounded-t-4xl" src={ICONS.SearchResultBg} />
                <Image
                    className="rounded-full w-[74px] absolute -bottom-8 left-1/2 -translate-x-1/2"
                    src={getNounAvatar(address)}
                />
            </div>
            <div className="text-center px-5 py-5">
                <p className="paragraph_bold text-black mt-5 mb-8">{name}</p>
                <Button
                    variant={"primary"}
                    label="Invite for challenge"
                    onClick={() => handleUpdateStep("status")}
                />
            </div>
        </div>
    );
};

export default SearchResult;
