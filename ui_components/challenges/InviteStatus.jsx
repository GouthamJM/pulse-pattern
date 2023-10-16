import { Button } from "@/ui_components/shared";
import { useRouter } from "next/router";
import { ICONS } from "@/utils/images";
import Image from "next/image";

const InviteStatus = () => {
    const router = useRouter();
    const navigate = router.push;
    return (
        <section className="relative h-full">
            <div className="container mx-auto h-full">
                <div className="h-full w-full text-center">
                    <h2 className="heading2_bold text-center pt-14 mb-2.5">Yeayiii !</h2>
                    <p className="paragraph_regular mb-6">
                        Challenge invite has been sent
                    </p>
                    <div className="bg-green rounded-4xl p-5 relative overflow-clip mb-20">
                        <div className="relative z-10 text-center mb-8">
                            <Image className="w-[70px] mx-auto" src={ICONS.walkIcon} />
                            <p className="paragraph_regular text-grey5 mb-1">Steps</p>
                            <p className="heading2_extrabold text-grey4 mb-2">5,000</p>
                            <p className="paragraph_bold text-grey6">in 4 days</p>
                        </div>

                        <div className="flex items-center justify-center gap-10 px-10 mb-4">
                            <div className="text-center min-w-[70px]">
                                <Image
                                    className="w-10 h-10 mb-1 mx-auto"
                                    src={ICONS.Profile}
                                />
                                <p className="paragraph_bold text-grey6">Jason_12</p>
                            </div>
                            <p className="heading2_extrabold italic text-grey7">VS</p>
                            <div className="text-center min-w-[70px]">
                                <Image
                                    className="w-10 h-10 mb-1 mx-auto"
                                    src={ICONS.Profile}
                                />
                                <p className="paragraph_bold text-grey6">You</p>
                            </div>
                        </div>
                        <div className="rounded-large bg-darkGreen/[0.16] flex items-center justify-center py-2 gap-2">
                            <p className="paragraph_regular text-grey4">Reward pool:</p>
                            <div className="flex items-center gap-2">
                                <Image src={ICONS.ethereum} className="w-5 h-5" />
                                <p className="paragraph_regular text-grey4">0.02</p>
                            </div>
                        </div>
                        <Image
                            className="w-full absolute left-0 top-0 z-0 h-full object-cover"
                            src={ICONS.StepsPattern}
                        />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-12 w-[380px] left-1/2 -translate-x-1/2 z-10 text-center">
                <p className="paragraph_regular mb-4">
                    We’ll notify you when challenge is accepted
                </p>
                <Button
                    variant={"primary"}
                    onClick={() => navigate("/")}
                    className="w-full"
                >
                    Back to home
                </Button>
            </div>
        </section>
    );
};

export default InviteStatus;
