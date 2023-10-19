import { ICONS } from "@/utils/images";
import Image from "next/image";

const ChallengeCard = () => {
    return (
        <div className="relative w-full bg-black p-6 rounded-3xl overflow-clip mb-4">
            <div className="mb-16 flex items-center gap-4">
                <Image src={ICONS.walkIconGreen} className="w-[106px]" alt="walk" />
                <div>
                    <h2 className="heading2_extrabold text-white mb-1">5,000</h2>
                    <p className="paragraph_regular mb-1"> Steps</p>

                    <p className="paragraph_regular text-white">in 4 days</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
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
            </div>
            <Image className="absolute right-0 top-0" src={ICONS.walkPattern} />
        </div>
    );
};

export default ChallengeCard;
