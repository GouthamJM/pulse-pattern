import { BackBtn } from "../shared";
import { ChallengeCard, LastSynced } from ".";
import Image from "next/image";
import { ICONS } from "@/utils/images";
import { customXMTPMessagingService } from "@/contract/xmtpProtocol";
import usePrivyClient from "@/utils/hooks/wallet/usePrivyClient";
import { useEffect } from "react";
import { useState } from "react";
import { Chat } from "../messages";
import UserChallengeDetail from "./UserChallengeDetail";

const LiveChallenge = ({ challenge }) => {
    // const { privyClient } = usePrivyClient();

    // const fetchMessages = async () => {
    //     console.log(privyClient, "privyClient");
    //     if (privyClient && challenge.acceptedUser) {
    //         const messages = await customXMTPMessagingService(
    //             privyClient,
    //         ).getConversation("0x06e70f295B6337c213DDe82D13cc198027687A7B");

    //         console.log(messages, "messages");
    //     }
    // };

    // const sendMessage = async () => {
    //     if (privyClient && challenge.acceptedUser) {
    //         const messages = await customXMTPMessagingService(
    //             privyClient,
    //         ).sendXMTPMessage(
    //             "0x06e70f295B6337c213DDe82D13cc198027687A7B",
    //             "Hi vaithi , complete it fast",
    //         );

    //         console.log(messages, "messages");
    //     }
    // };

    // useEffect(() => {
    //     if (privyClient && challenge.acceptedUser) {
    //         (async () => {
    //             await fetchMessages();
    //         })();
    //     }
    // }, [challenge?.acceptedUser]);
    const [currentTab, setCurrentTab] = useState(2);
    const handleTabClick = (tabId) => {
        setCurrentTab(tabId);
    }
    return (
        <section className="relative h-[calc(100dvh-64px)] pt-4">
            {currentTab === 1 ? <div className="container mx-auto h-auto relative">
                <div className="h-full w-full">
                    <BackBtn className="mb-2" />
                    {/* <Button onClick={sendMessage}>Send Message</Button> */}
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
                    ) : (
                        <Chat />
                    )}
                </div>
            )}
            {
                <div className="bg-white grid grid-cols-2 fixed bottom-0 p-5 w-full md:w-[420px]">
                    <div
                        className="flex justify-center items-center"
                        onClick={() => handleTabClick(1)}
                    >
                        {currentTab === 1 ? (
                            <Image
                                className="w-6 h-6 cursor-pointer"
                                src={ICONS.barChartSel}
                            />
                        ) : (
                            <Image
                                className="w-6 h-6 cursor-pointer"
                                src={ICONS.barChatUnsel}
                            />
                        )}
                    </div>
                    <div
                        className="flex justify-center items-center"
                        onClick={() => handleTabClick(2)}
                    >
                        {currentTab === 2 ? (
                            <Image
                                className="w-6 h-6 cursor-pointer"
                                src={ICONS.chatSel}
                            />
                        ) : (
                            <Image
                                className="w-6 h-6 cursor-pointer"
                                src={ICONS.chatUnsel}
                            />
                        )}
                    </div>
                </div>
<<<<<<< HEAD
            }
            {showDetail && (
                <UserChallengeDetail
                    showDetail={showDetail}
                    handleShowDetail={handleShowDetail}
                />
            )}
=======
            </div> : <Chat/>}
            <div className="bg-white grid grid-cols-2 fixed bottom-0 p-5 w-full md:w-[420px]">
                <div className="flex justify-center items-center" onClick={() => handleTabClick(1)}>
                    {currentTab === 1 ? <Image className="w-6 h-6" src={ICONS.barChartSel} /> : <Image className="w-6 h-6" src={ICONS.barChatUnsel} />}
                </div>
                <div className="flex justify-center items-center" onClick={() => handleTabClick(2)}>
                    {currentTab === 2 ? <Image className="w-6 h-6" src={ICONS.chatSel} /> : <Image className="w-6 h-6" src={ICONS.chatUnsel} />}
                </div>
            </div>
>>>>>>> c214431 (Added bottom nav for challenge page)
        </section>
    );
};

export default LiveChallenge;
