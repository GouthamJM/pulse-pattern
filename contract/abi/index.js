import PULSE_PATTERN_CONTRACT from "./pulsePattern.json";

const POLYGON_ZK_EVM_PULSE_PATTERN_CONTRACT =
    "0xD58e784F310A59ce9CF00F32298b39825094d8e7";
class PulsePatternContract {
    constructor() {
        this.smartContract = PULSE_PATTERN_CONTRACT;
    }

    initContract() {
        const contract = new ethers.Contract(
            POLYGON_ZK_EVM_PULSE_PATTERN_CONTRACT,
            this.smartContract,
            signerOrProvider,
        );
        return contract;
    }
}

export { PULSE_PATTERN_CONTRACT };
