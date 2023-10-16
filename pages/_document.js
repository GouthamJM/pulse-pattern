import { Header } from "@/ui_components/shared";
import { Head, Html, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
