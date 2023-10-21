import { ICONS } from "@/utils/images";
import Image from "next/image";

const LastSynced = () => {
    return (
        <div className="flex items-center justify-between mb-9">
            {/* <p className="paragraph_regular">Last Synced: </p>
            <div className="flex items-center gap-2">
                <p className="paragraph_regular">12 Jun - 08:30 PM</p>
                <Image src={ICONS.refresh} />
            </div> */}
        </div>
    );
};

export default LastSynced;
