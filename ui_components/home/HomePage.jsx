import { Button } from "@/ui_components/shared";
import { getNounAvatar } from "@/utils";
import { STRAVA_AUTH_URL } from "@/constants";
import { useRouter } from "next/router";
import { ICONS } from "@/utils/images";
import Image from "next/image";

export default function HomePage() {
    const router = useRouter();
    const navigate = router.push;

    const stravaRedirectUrl = `${STRAVA_AUTH_URL}?client_id=114067&redirect_uri=http://localhost:5173/&response_type=code&approval_prompt=auto&scope=activity:read`;

    const proImg = "0xdBd71c0b92caA92e37b2bCC43019f38947A2B0e6";

    return (
        <section className="mt-4 h-full bg-white overflow-y-auto hide-scrollbar">
            <div className="container mx-auto h-full">
                <div className="h-full w-full">
                    <div className="relative">
                        <Image src={ICONS.ProfileBg} />
                        <img
                            className="rounded-full w-[86px] absolute -bottom-8 left-[-2px]"
                            src={getNounAvatar(proImg)}
                        />
                    </div>
                    <div className="mt-10 mb-11">
                        <p className="paragraph_regular text-black mb-7">Hey there!</p>

                        <h2 className="heading2_bold mb-2 pr-[100px]">
                            Looks like there are no active goals set.
                        </h2>
                        <p className="paragraph_regular mb-5 pr-[120px]">
                            Set a goal and challenge your friends to complete them & Grow
                            together !
                        </p>
                        <Button
                            variant={"primary"}
                            onClick={() => navigate("create-challenge")}
                        >
                            Create a challenge
                        </Button>
                    </div>
                    <div className="pb-10">
                        <div className="p-5 border border-grey2 rounded-4xl">
                            <Image className="w-6 h-6 mb-2" src={ICONS.connectIcon} />
                            <p className="paragraph_regular text-black mb-[14px]">
                                Link your Strava account to track <br /> accurately
                            </p>
                            <Button
                                variant={"ghost"}
                                disabled={
                                    typeof isStravaConnected === "boolean" &&
                                    isStravaConnected
                                        ? true
                                        : false
                                }
                            >
                                <a
                                    href={
                                        typeof isStravaConnected === "boolean" &&
                                        isStravaConnected
                                            ? ""
                                            : stravaRedirectUrl
                                    }
                                >
                                    {typeof isStravaConnected === "boolean" &&
                                    isStravaConnected
                                        ? "Connected"
                                        : "Connect"}
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
