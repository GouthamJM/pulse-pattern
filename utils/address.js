import { isAddress } from "@ethersproject/address";

export const getEthChainAddress = (address) => {
    return address.split(":")[2];
};

export const formatEthChainsAddress = (address) => {
    if (!address) {
        return "";
    }

    return `eip155:1:${address}`;
};

export const isValidEnsDomain = (domain) => {
    return /[A-z][A-z]*.eth$/u.test(domain);
};

export const isValidAddressOrEnsDomain = (stringToTest) => {
    return isValidEnsDomain(stringToTest) || isAddress(stringToTest);
};
