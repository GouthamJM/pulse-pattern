import axios from "axios";

export const globalApiService = (method, params, rpcUrl) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
        jsonrpc: "2.0",
        method: method,
        params,
        id: 1,
    });

    const requestOptions = {
        method: "POST",
        headers,
        body,
    };

    const jsonRpcUrl = rpcUrl;

    return fetch(jsonRpcUrl, requestOptions)
        .then((response) => response.json())
        .catch((e) => e);
};

export const axiosInstance = axios.create();

export const getApiService = (data) => {
    const { method, payload, url, requestHeader, body } = data;
    const config = {
        method: method,
        url: url,
        headers: {
            "Content-Type": "application/json",
            ...requestHeader,
        },
        params: payload,
        data: body,
    };
    return new Promise((resolve, reject) => {
        axiosInstance(config)
            .then((res) => resolve(res))
            .catch((e) => reject(e));
    });
};
