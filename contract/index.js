import PULSE_PATTERN_CONTRACT from "./abi/pulsePattern.json";
import { createWalletClient, http, getContract, createPublicClient } from "viem";
import { polygonZkEvmTestnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const POLYGON_ZK_EVM_PULSE_PATTERN_CONTRACT =
    "0xD58e784F310A59ce9CF00F32298b39825094d8e7";

class PulsePatternContract {
    constructor() {
        this.smartContractABI = PULSE_PATTERN_CONTRACT;
        this.contract;
        this.walletClient;
        this.publicClient;
        this.smartContractAddress = POLYGON_ZK_EVM_PULSE_PATTERN_CONTRACT;
    }
    // private
    async publicClientInit() {
        if (!this.publicClient) {
            this.publicClient = createPublicClient({
                chain: polygonZkEvmTestnet,
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
                chain: polygonZkEvmTestnet,
                transport: http(),
            });
        }
        return this.walletClient;
    }

    // private
    async initContract(publicClient) {
        if (!this.contract) {
            this.contract = getContract({
                address: POLYGON_ZK_EVM_PULSE_PATTERN_CONTRACT,
                abi: this.smartContractABI,
                publicClient,
            });
        }

        return this.contract;
    }

    // private
    async getTransactionReceipt(hash) {
        await this.publicClientInit();
        const transaction = await this.publicClient.waitForTransactionReceipt({ hash });
        return transaction;
    }

    // private
    async initContractAndClient() {
        await this.walletClientInit();
        await this.initContract(this.walletClient);
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

    // public write
    async unsignedCreateChallenge(
        _challengeId,
        _expiryDate,
        _betAmount,
        _target,
        _participentsAddresses,
        _isPublicChallenge,
    ) {
        await this.initContractAndClient();

        const res = await this.walletClient.writeContract({
            address: this.smartContractAddress,
            abi: this.smartContractABI,
            functionName: "createChallenge",
            args: [
                _challengeId,
                _expiryDate,
                _betAmount,
                _target,
                _participentsAddresses,
                _isPublicChallenge,
            ],
            value: _betAmount,
        });

        return await this.getTransactionReceipt(res);
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
    async deleteChallenge(_challengeId) {
        await this.initContractAndClient();

        const res = await this.walletClient.writeContract({
            address: this.smartContractAddress,
            abi: this.smartContractABI,
            functionName: "deleteChallenge",
            args: [_challengeId],
        });

        return await this.getTransactionReceipt(res);
    }
}
const pulsePatternContractService = new PulsePatternContract();
export { pulsePatternContractService };
