"use client";
import { Buffer } from "buffer";

export const polyfill = () => {
    if (typeof window !== undefined) {
        window.Buffer = Buffer;
    }
};
