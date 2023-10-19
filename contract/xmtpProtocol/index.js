import { Client } from "@xmtp/xmtp-js";
import {
    AttachmentCodec,
    RemoteAttachmentCodec,
} from "@xmtp/content-type-remote-attachment";
import { createWalletClient, http } from "viem";
import { polygonZkEvmTestnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

class XMTPProtocol {
    constructor(accountPrivateKey = process.env.NEXT_PUBLIC_EOA_PRIVATE_KEY) {
        this.xmtpClient = null;
        this.walletClient;
        this.xmtpConversation;
        this.accountPrivateKey = accountPrivateKey;
    }

    // private
    async walletClientInit() {
        if (!this.walletClient) {
            const account = privateKeyToAccount(this.accountPrivateKey);

            this.walletClient = createWalletClient({
                account,
                chain: polygonZkEvmTestnet,
                transport: http(),
            });
        }
        return this.walletClient;
    }

    async initializeUser() {
        if (!this.user) {
            await this.walletClientInit();
            this.xmtpClient = await Client.create(this.walletClient, { env: "dev" });
            this.xmtpClient.registerCodec(new AttachmentCodec());
            this.xmtpClient.registerCodec(new RemoteAttachmentCodec());
        }
    }

    async initializeConversation(address) {
        const broadcasts_canMessage = await this.xmtpClient.canMessage([address]);
        if (broadcasts_canMessage) {
            this.xmtpConversation = await this.xmtpClient.conversations.newConversation(
                address,
            );
        }
    }

    async getConversation(address) {
        await this.initializeUser();
        await this.initializeConversation(address);
        const messages = await this.xmtpConversation.messages();
        return messages;
    }

    async sendXMTPMessage(address, message) {
        await this.initializeUser();
        await this.initializeConversation(address);
        const messages = await this.xmtpConversation.send(message);
        return messages;
    }
}

const xmtpMessagingService = new XMTPProtocol();
const customXMTPMessagingService = (accountPrivateKey) => {
    return new XMTPProtocol(accountPrivateKey);
};

export { xmtpMessagingService, customXMTPMessagingService };
