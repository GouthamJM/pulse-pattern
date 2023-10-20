import { BackBtn } from "../shared";
import { ChallengeCard, LastSynced } from ".";
import Image from "next/image";
import { ICONS } from "@/utils/images";

const LiveChallenge = ({ challenge }) => {
    return (
        <section className="relative h-[calc(100dvh-64px)] pt-4">
            <div className="container mx-auto h-full relative">
                <div className="h-full w-full">
                    <BackBtn className="mb-2" />
                    <p className="paragraph_regular mb-1">Watch out!</p>
                    <h2 className="heading2_bold mb-6">Challenge is now live</h2>
                    <ChallengeCard {...challenge} />
                    <LastSynced />
                    <div>
                        <div className="flex items-center justify-between mb-7">
                            <div className="flex items-center gap-1">
                                <Image
                                    className="w-10 rounded-full"
                                    src={ICONS.Profile}
                                />
                                <p className="paragraph_regular text-black">You</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="paragraph_regular text-red">200 steps</p>
                                <Image src={ICONS.chevronRight} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-7">
                            <div className="flex items-center gap-1">
                                <Image className="w-10" src={ICONS.Profile} />
                                <p className="paragraph_regular text-black">You</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="paragraph_regular text-green">5000 steps</p>
                                <Image src={ICONS.chevronRight} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveChallenge;
