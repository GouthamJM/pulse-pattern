import {
    ChatHeader,
} from "@/ui_components/messages";
import { getFromLocalStorage, getNounAvatar } from "@/utils";
import { ICONS } from "@/utils/images";

const Chat = () => {
    const msgs = [
        {
            user: "ADMIN",
            message: "hi",
        },
        {
            user: "Vaithi",
            message: "hi",
        },
        {
            user: "ADMIN",
            message: "How r u?",
        },
        {
            user: "Vaithi",
            message: "Fine! u?",
        },
        {
            user: "ADMIN",
            message: "Fine",
        },
        {
            user: "Vaithi",
            message: "Okay! bye",
        },
    ];

    const address = getFromLocalStorage("address");
    return (
        <div className="chatWindow flex flex-col pb-6 h-screen bg-white">
            <ChatHeader />
            {/* <div className="chatMessages h-full flex flex-col px-4">
                <ChatBeginning />
                <InviteMessage />
            </div>
            <MessageBox /> */}
            <div className="pt-[128px] justify-between flex flex-col h-[calc(100vh-120px)] bg-[#FAFBFF] pb-6">
                <div
                    id="messages"
                    className=" flex flex-col-reverse overflow-y-scroll overflow-hidden"
                >
                    <div className="chat-message mx-6 mt-5" id="chats">
                        {msgs.length &&
                            msgs.map((value, index) => {
                                return (
                                    <div
                                        className={`flex items-center ${
                                            value.user === "ADMIN"
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                        key={index}
                                    >
                                        {value.user !== "ADMIN" && (
                                            <div
                                                className={`w-8 h-8 relative flex flex-shrink-0 mr-2`}
                                            >
                                                <img
                                                    className="shadow-md rounded-full w-full h-full object-cover"
                                                    src={
                                                        typeof address === "undefined"
                                                            ? ICONS.Profile
                                                            : getNounAvatar(address)
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                        <pre
                                            className={` mb-3 py-2 px-5 w-fit max-w-[75%] rounded-tr-2xl rounded-tl-2xl ${
                                                value.user == name ? "" : ""
                                            } ${
                                                value.user === "ADMIN"
                                                    ? "text-white bg-[#67CA71] rounded-bl-2xl"
                                                    : "text-white bg-[#000000] rounded-br-2xl"
                                            }`}
                                            style={{
                                                overflow: "auto",
                                                whiteSpace: "pre-wrap",
                                                //   wordWrap: "break-word",
                                            }}
                                        >
                                            {value.message}
                                        </pre>
                                    </div>
                                );
                            })}

                        <div id="anchor"></div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-[72px] w-full md:w-[410px] border-gray-200 px-4 pt-4 mb-2 sm:mb-0 ">
                <div className="relative flex">
                    <input
                        type="text"
                        placeholder="Write your message!"
                        id="data"
                        className="w-full focus:outline-none border border-[#CFCFCF] focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 p-4 bg-white rounded-[30px]"
                    />
                    <div className="absolute right-8 items-center inset-y-0 hidden sm:flex">
                        <button
                            type="button"
                            id="send"
                            className="inline-flex items-center justify-center rounded-3xl px-2 py-2 transition duration-500 ease-in-out text-white focus:outline-none"
                        >
                            <svg
                                width="19"
                                height="18"
                                viewBox="0 0 19 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.4258 8.09517L1.42576 0.095167C1.25458 0.0146173 1.06406 -0.0157201 0.876322 0.00767786C0.688587 0.0310758 0.511339 0.107249 0.365164 0.227352C0.218988 0.347455 0.109881 0.50656 0.0505117 0.686191C-0.00885731 0.865822 -0.0160522 1.05861 0.0297628 1.24217L1.24176 6.09117L8.99976 9.00017L1.24176 11.9092L0.0297628 16.7582C-0.0169142 16.9419 -0.0103198 17.135 0.0487745 17.3151C0.107869 17.4952 0.21702 17.6547 0.363459 17.7751C0.509899 17.8954 0.687572 17.9715 0.875696 17.9946C1.06382 18.0176 1.25461 17.9866 1.42576 17.9052L18.4258 9.90517C18.5976 9.82441 18.7428 9.69642 18.8446 9.53617C18.9463 9.37591 19.0004 9.19 19.0004 9.00017C19.0004 8.81034 18.9463 8.62443 18.8446 8.46417C18.7428 8.30391 18.5976 8.17592 18.4258 8.09517Z"
                                    fill="#96A398"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Chat;