import { Client } from "@xmtp/xmtp-js";
import {
    AttachmentCodec,
    RemoteAttachmentCodec,
} from "@xmtp/content-type-remote-attachment";

class XMTPProtocol {
    constructor(walletClient) {
        this.xmtpClient = null;
        this.walletClient = walletClient;
        this.xmtpConversation;
    }

    async initializeUser() {
        this.xmtpClient = await Client.create(this.walletClient, { env: "dev" });
        this.xmtpClient.registerCodec(new AttachmentCodec());
        this.xmtpClient.registerCodec(new RemoteAttachmentCodec());
    }

    async initializeConversation(address) {
        const broadcasts_canMessage = await this.xmtpClient.canMessage([address]);
        let initialize = false;
        if (broadcasts_canMessage?.[0]) {
            this.xmtpConversation = await this.xmtpClient.conversations.newConversation(
                address,
            );
            initialize = true;
        }

        return initialize;
    }

    // for fetching all conversations
    async getConversation(address) {
        await this.initializeUser();
        const checkInit = await this.initializeConversation(address);
        if (checkInit) {
            const messages = await this.xmtpConversation.messages();
            return messages;
        } else {
            return [];
        }
    }

    // for sending message
    async sendXMTPMessage(address, message) {
        await this.initializeUser();
        await this.initializeConversation(address);
        const messages = await this?.xmtpConversation?.send(message);
        return messages;
    }
}

const customXMTPMessagingService = (walletClient) => {
    return new XMTPProtocol(walletClient);
};

export { customXMTPMessagingService };
