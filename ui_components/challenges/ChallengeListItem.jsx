import { ICONS } from "@/utils/images";
import Image from "next/image";

export default function ChallengeListItem() {
    return (
        <div className="relative w-full bg-black p-6 rounded-3xl overflow-clip">
            <div className="mb-16">
                <Image src={ICONS.walkIconGreen} className="mb-4" alt="walk" />
                <p className="paragraph_regular mb-1"> Steps</p>
                <h2 className="heading2_extrabold text-white mb-1">5,000</h2>
                <p className="paragraph_regular text-white">in 4 days</p>
            </div>

            <div className="flex items-center gap-1 mb-1.5">
                <Image src={ICONS.trophy} alt="trophy" />
                <p className="paragraph_regular">Reward pool:</p>
            </div>
            <div className="flex items-center gap-1 mb-1.5">
                <Image
                    height={20}
                    width={20}
                    className="rounded-full"
                    src={ICONS.ethereum}
                    alt="eth"
                />
                <p className="paragraph_bold text-white">0.02 ETH</p>
            </div>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-right">
                <p className="mb-1 paragraph_bold italic text-grey">Vs.</p>
                <p className="mb-1 paragraph_bold text-white">Jason_12</p>
            </div>
            <Image className="absolute right-0 top-0" src={ICONS.walkPattern} />
            <Image className="absolute -right-10 -bottom-4 w-32" src={ICONS.Profile} />
        </div>
    );
}
