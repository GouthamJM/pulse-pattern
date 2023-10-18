import axios from "axios";
import {
    API_METHOD,
    HEADER_APPLICATION_JSON,
    HTTP_SUCCESS_CODES,
    STRAVA_AUTH_URL,
} from "@/constants";
import { globalApiService } from "./globalApiServices";

export const axiosInstance = axios.create();

const ETHEREUM_REQUESTS = {
    ethBalance: "eth_getBalance",
    ethEstimatedGas: "eth_estimateGas",
    ethGasPrice: "eth_gasPrice",
    ethSendRawTransaction: "eth_sendRawTransaction",
    ethGetTransactionCount: "eth_getTransactionCount",
    ethTransactionStatus: "eth_getTransactionReceipt",
};

export const getBalance = async (address) => {
    return new Promise(function (resolve, reject) {
        globalApiService(ETHEREUM_REQUESTS.ethBalance, [address, "latest"])
            .then((response) => {
                resolve(response);
            })
            .catch((e) => reject(e));
    });
};

export const getStravaAuth = (query) => {
    const config = {
        method: API_METHOD.GET,
        url: STRAVA_AUTH_URL,
        headers: HEADER_APPLICATION_JSON,
        params: query,
    };
    return new Promise((resolve) => {
        axiosInstance(config)
            .then((res) => {
                if (HTTP_SUCCESS_CODES.includes(res.status)) {
                    const {
                        data: { data },
                    } = res;
                    resolve(data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    });
};

export const getUsdPrice = () => {
    const config = {
        method: "get",
        url: `https://pro-api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&x_cg_pro_api_key=${process.env.NEXT_PUBLIC_COIN_GECKO_API_KEY}`,
        headers: { "Content-Type": "application/json" },
    };
    return new Promise((resolve) => {
        axiosInstance(config)
            .then((res) => {
                if (res.status === 200) {
                    resolve(res);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    });
};

export const getSearchResult = (q) => {
    const config = {
        method: "get",
        url: `https://api.web3.bio/profile/${q}`,
        headers: { "Content-Type": "application/json" },
    };
    return new Promise((resolve) => {
        axiosInstance(config)
            .then((res) => {
                if (res.status === 200) {
                    resolve(res);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    });
};

export const getSendTransactionStatus = async (hash) => {
    return new Promise(function (resolve, reject) {
        globalApiService(ETHEREUM_REQUESTS.ethTransactionStatus, [hash])
            .then((response) => {
                resolve(response);
            })
            .catch((e) => reject(e));
    });
};
