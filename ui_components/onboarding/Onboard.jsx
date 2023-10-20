import { Button } from "@/ui_components/shared";
import { ICONS } from "@/utils/images";
import Image from "next/image";

export default function Onboarding({ handleClick, open, signInLoader }) {
    return (
        <section className="h-[100dvh] overflow-clip hide-scrollbar bg-black relative">
            <div className="container mx-auto h-full">
                <Image
                    className="w-[30vw] cursor-pointer relative z-10 pt-8"
                    src={ICONS.logoWhite}
                />
                <div className="h-full w-full">
                    <div className="mt-8 relative z-20">
                        <h1 className="heading1_extrabold uppercase text-grey4 italic">
                            Challenge <br /> Track <br /> Conquer!
                        </h1>
                    </div>
                    {signInLoader ? (
                        <p className="paragraph_bold text-black text-center">
                            Signing in...
                        </p>
                    ) : (
                        <div className="flex flex-col items-center gap-5 pb-5">
                            <Button
                                variant={"primary"}
                                label="Google signin"
                                onClick={() => {
                                    handleClick();
                                }}
                            />
                            <Button
                                variant={"primary"}
                                label="WalletConnect Signin"
                                onClick={() => {
                                    open();
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Image
                className="absolute bottom-0 h-[100dvh] object-cover"
                src={ICONS.onboardingBg}
                alt="bg"
            />
            <div className="absolute bottom-0 w-full left-0 h-[22vh] onboardingOverlay"></div>
            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-[calc(100vw-40px)]">
                <p className="paragraph_regular text-grey2 mb-4 text-center">
                    Get started now
                </p>
                {signInLoader ? (
                    <p className="paragraph_regular text-grey2 mb-4 text-center">
                        Signing in...
                    </p>
                ) : (
                    <div>
                        <Button
                            className={
                                "absolute font-bold left-1/2 -translate-x-1/2 w-[300px]"
                            }
                            variant={"secondary"}
                            label="Connect via Privy"
                            onClick={() => {
                                handleClick();
                            }}
                        />
                        <Image
                            src={ICONS.privyLogo}
                            width={32}
                            height={32}
                            className="absolute left-1/2 -translate-y-[38px] translate-x-[72px] rounded-full"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
