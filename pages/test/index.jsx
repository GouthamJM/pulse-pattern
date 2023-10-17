import { pulsePatternContractService } from "@/contract";
import { Button } from "@/ui_components/shared";
import { parseEther } from "viem";

function Test() {
    const fetchSmartContractData = async () => {
        const [challengeId, expiry, betAmoubt, target, participentsAddress, isPublic] = [
            1276433,
            Date.now(),
            parseEther("0.001"),
            500,
            ["0xdBd71c0b92caA92e37b2bCC43019f38947A2B0e6"],
            false,
        ];
        const res = await pulsePatternContractService.unsignedCreateChallenge(
            challengeId,
            expiry,
            betAmoubt,
            target,
            participentsAddress,
            isPublic,
        );

        console.log(res, "res");
    };
    return (
        <div>
            <div>Smart Contract Test Functions</div>
            <Button onClick={fetchSmartContractData} variant="primary">
                Fetch Smart contract balance
            </Button>
        </div>
    );
}

export default Test;
