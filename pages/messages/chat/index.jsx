import {
    MessageBox,
    ChatBeginning,
    ChatHeader,
    InviteMessage,
} from "@/ui_components/messages";

const ChatList = () => {
    return (
        <div className="chatWindow flex h-full flex-col pb-6">
            <ChatHeader />
            <div className="chatMessages h-full flex flex-col px-4">
                <ChatBeginning />
                <InviteMessage />
            </div>
            <MessageBox />
        </div>
    );
};
export default ChatList;
