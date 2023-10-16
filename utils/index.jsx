import { getNounData, getNounSeedFromBlockHash, ImageData } from "@nouns/assets";
import { buildSVG } from "@nouns/sdk";
export const getImage = (image) => {
    return <Image src={`/assets/images/${image}`} alt="me" width="64" height="64" />;
};

export const getNounAvatar = (blockhash) => {
    const uniqueNumber = hashString(blockhash);
    const seed = getNounSeedFromBlockHash(uniqueNumber, padTo32Bytes(blockhash));
    const { parts, background } = getNounData(seed);
    const { palette } = ImageData; // Used with `buildSVG``
    const svgBinary = buildSVG(parts, palette, background);
    const svgBase64 = btoa(svgBinary);
    return `data:image/svg+xml;base64,${svgBase64}`;
};

function padTo32Bytes(hexAddress) {
    // Remove the '0x' prefix if present
    let cleanHexAddress = hexAddress.startsWith("0x")
        ? hexAddress.substring(2)
        : hexAddress;

    // Check if the address is already 32 bytes (64 hex characters)
    if (cleanHexAddress.length === 64) {
        return "0x" + cleanHexAddress;
    }

    // Pad zeros to make it 32 bytes (64 hex characters)
    const paddingNeeded = 64 - cleanHexAddress.length;
    cleanHexAddress = "0".repeat(paddingNeeded) + cleanHexAddress;

    return "0x" + cleanHexAddress;
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    hash = Math.abs(hash);
    hash = hash % 100000;
    if (hash < 10000) {
        hash += 10000;
    }
    return hash;
}

export const trimAddress = (val, charsToKeep) => {
    if (!val) {
        return;
    }
    if (val.length <= charsToKeep * 2) {
        return val; // Return the full string if it's shorter than what you want to keep
    }

    const firstChars = val?.substring(0, charsToKeep);
    const lastChars = val?.substring(val.length - charsToKeep, val.length);
    return firstChars + "..." + lastChars;
};

export const isMobile = () => {
    return window.innerWidth < 700;
};

// // Function to save a list of objects to localStorage
export const saveToLocalStorage = (key, list) => {
    try {
        localStorage.setItem(key, JSON.stringify(list));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

// // Function to retrieve a list of objects from localStorage
export const getFromLocalStorage = (key) => {
    try {
        const storedList = localStorage.getItem(key);
        return storedList ? JSON.parse(storedList) : undefined;
    } catch (error) {
        console.error("Error retrieving from localStorage:", error);
        return undefined;
    }
};

export const getTokenFormattedNumber = (
    value,
    decimals,
    roundOff = true,
    fractions = 0,
) => {
    const _decimals = decimals || 18;
    const _value = parseFloat(value) || 0;
    const _expoValue = Math.pow(10, _decimals);
    let _calculated = _value / _expoValue;
    if (!roundOff) {
        return Number(_calculated);
    }
    let _decimalFixed = fractions;
    if (fractions == 0) {
        _decimalFixed = 2;
        if (_calculated < 100) {
            _decimalFixed = 6;
        }
    }
    const expo = Math.pow(10, _decimalFixed);
    _calculated = Math.floor(_calculated * expo) / expo;
    return Number(_calculated.toFixed(_decimalFixed));
};

export const hexToNumber = (val, divider = 1) => {
    return parseInt(val, 16) / divider;
};
