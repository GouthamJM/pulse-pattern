import PULSE_PATTERN_CONTRACT from "./abi/pulsePattern.json";
import {
    createWalletClient,
    http,
    getContract,
    createPublicClient,
    formatEther,
} from "viem";
import { scrollSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { LRUCache } from "lru-cache";
import dayjs from "dayjs";

const cache = new LRUCache({
    ttl: 1000 * 60 * 5,
    max: 500,
    maxSize: 5000,
    allowStale: true,
    sizeCalculation: (value, key) => {
        return 1;
    },
});

const SCROLL_ZK_EVM_PULSE_PATTERN_CONTRACT = "0x9a2C54E90BB8E8fb88742019e6767d012e74D4B1";

class PulsePatternContract {
    constructor(walletClient) {
        this.smartContractABI = PULSE_PATTERN_CONTRACT;
        this.contract;
        this.walletClient = walletClient;
        this.publicClient;
        this.smartContractAddress = SCROLL_ZK_EVM_PULSE_PATTERN_CONTRACT;
    }

    async getWalletAddress() {
        return process.env.NEXT_PUBLIC_EOA_PUBLIC_KEY;
    }
    // private
    async publicClientInit() {
        if (!this.publicClient) {
            this.publicClient = createPublicClient({
                chain: scrollSepolia,
                transport: http(),
            });
        }
    }

    // private
    async walletClientInit() {
        if (!this.walletClient) {
            const account = privateKeyToAccount(process.env.NEXT_PUBLIC_EOA_PRIVATE_KEY);

            this.walletClient = createWalletClient({
                account,
                chain: scrollSepolia,
                transport: http(),
            });
        }
        return this.walletClient;
    }

    // private
    async initContract(publicClient) {
        if (!this.contract) {
            this.contract = getContract({
                address: SCROLL_ZK_EVM_PULSE_PATTERN_CONTRACT,
                abi: this.smartContractABI,
                publicClient,
            });
        }

        return this.contract;
    }

    // private
    async getTransactionReceipt(hash) {
        const transaction = await this.publicClient.waitForTransactionReceipt({ hash });
        return transaction;
    }

    // private
    async initContractAndClient() {
        await this.walletClientInit();
        await this.initContract(this.walletClient);
        await this.publicClientInit();
    }

    // public read
    async getSmartContractBalance() {
        await this.initContractAndClient();
        const result = await this.contract.read.smartContractBalance();
        return result;
    }

    // public read
    async listOfAcceptedUsers(_challengeId) {
        await this.initContractAndClient();
        const result = await this.contract.read.listOfAcceptedUsers(_challengeId);
        return result;
    }

    // public read
    async getOwner() {
        await this.initContractAndClient();
        const result = await this.contract.read.owner();
        return result;
    }

    // public read
    async getUserChallenges(address) {
        await this.initContractAndClient();
        const result = await this.publicClient.readContract({
            address: this.smartContractAddress,
            abi: this.smartContractABI,
            functionName: "fetchUserChallenges",
            args: [address],
        });

        return result;
    }

    // public write
    async createChallenge(
        _challengeId,
        _expiryDate,
        _betAmount,
        _target,
        _isPublicChallenge,
    ) {
        await this.initContractAndClient();

        const res = await this.walletClient.writeContract({
            address: this.smartContractAddress,
            abi: this.smartContractABI,
            functionName: "createChallenge",
            args: [_challengeId, _expiryDate, _betAmount, _target, _isPublicChallenge],
            value: _betAmount,
        });

        return await this.getTransactionReceipt(res);
    }

    async getChallenge(_challengeId, userAddress) {
        await this.initContractAndClient();

        const result = await this.publicClient.readContract({
            address: this.smartContractAddress,
            abi: this.smartContractABI,
            functionName: "challenges",
            args: [_challengeId],
        });

        const [
            challengeCreatorAddress,
            challengeId,
            amountToBeStaked,
            expiryDate,
            target,
            totalAcceptedUsers,
            acceptedUser,
            totalWinners,
            isPublicChallenge,
            isActive,
        ] = result;
        const formattedResult = {
            challengeCreatorAddress,
            challengeId,
            amountToBeStaked: formatEther(amountToBeStaked),
            expiryDate: dayjs.unix(Number(expiryDate)).format(),
            target: Number(target),
            totalAcceptedUsers,
            totalWinners,
            isPublicChallenge,
            isActive,
            userAddress,
            acceptedUser,
        };
        return formattedResult;
    }

    // public write
    async addUserToChallenge(_challengeId) {
        await this.initContractAndClient();

        const res = await this.walletClient.writeContract({
            address: this.smartContractAddress,
            abi: this.smartContractABI,
            functionName: "addUserToChallenge",
            args: [_challengeId],
        });

        return await this.getTransactionReceipt(res);
    }

    // public write
    async claimReward(_challengeId) {
        await this.initContractAndClient();

        const res = await this.walletClient.writeContract({
            address: this.smartContractAddress,
            abi: this.smartContractABI,
            functionName: "claimReward",
            args: [_challengeId],
        });

        return await this.getTransactionReceipt(res);
    }

    // public write
    async deleteChallenge(_challengeId, _betAmount) {
        await this.initContractAndClient();

        const res = await this.walletClient.writeContract({
            address: this.smartContractAddress,
            abi: this.smartContractABI,
            functionName: "deleteChallenge",
            args: [_challengeId, _betAmount],
        });

        return await this.getTransactionReceipt(res);
    }
}
const pulsePatternContractService = new PulsePatternContract();
const customPulsePatternContract = (client) => {
    return new PulsePatternContract(client);
};
export { pulsePatternContractService, customPulsePatternContract };
