import { getNounAvatar, trimAddress } from "@/utils";

const ChatBeginning = () => {
    return (
        <div className="chatBeginning flex items-center flex-col justify-center h-full w-full">
            <img
                src={getNounAvatar("0xD322A0bd6A139cFd359F1EFC540F6cb358d73A16")}
                className="w-16 h-16 rounded-full mb-4"
            />
            <div className="text-center">
                <p className="paragraph_bold mb-2">
                    {trimAddress("0xD322A0bd6A139cFd359F1EFC540F6cb358d73A16", 5)}
                </p>
                <p className="paragraph_medium text-gray-400">
                    {" "}
                    This is the beginning of your encrypted chat.
                </p>
            </div>
        </div>
    );
};
export default ChatBeginning;
