"use client";
import Onboarding from "@/ui_components/onboarding/Onboard";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils";
import { useEffect, useState } from "react";

import { useWeb3Modal } from "@web3modal/react";
import { useWallets, usePrivy } from "@privy-io/react-auth";
import { scrollSepolia } from "wagmi/chains";

function withAuth(Component) {
    const Auth = (props) => {
        const [loader, setLoader] = useState(true);
        const [loggedIn, setLoggedIn] = useState(false);
        const [signInLoader, setSignInLoader] = useState(false);

        const { open } = useWeb3Modal();
        const { login, ready, authenticated, user, createWallet } = usePrivy();
        const { wallets } = useWallets();
        const handleClick = async () => {
            setSignInLoader(true);
            login();
        };

        useEffect(() => {
            async function initPriv() {
                if (ready) {
                    setLoader(false);
                    saveToLocalStorage(window?.location.pathname, "pathname");
                    if (ready && authenticated && user) {
                        const embeddedWallet = wallets?.find(
                            (wallet) => wallet.walletClientType === "privy",
                        );

                        const chainSel = getFromLocalStorage("selectedChain");
                        if (chainSel === undefined) {
                            embeddedWallet && (await embeddedWallet.switchChain(534351));
                            saveToLocalStorage("selectedChain", scrollSepolia);
                        }
                        saveToLocalStorage("address", embeddedWallet?.address);
                        saveToLocalStorage("isLoggedIn", true);
                        setLoggedIn(true);
                        setSignInLoader(false);
                    }
                }
            }

            (async function () {
                await initPriv();
            })();
        }, [ready, authenticated, user, wallets]);

        if (loader)
            return <div className="flex items-center justify-center">Loading...</div>;
        if (!loggedIn) {
            return (
                <div className="app mobView">
                    <Onboarding
                        handleClick={handleClick}
                        open={open}
                        signInLoader={signInLoader}
                    />
                </div>
            );
        }

        return <Component {...props} />;
    };
    return Auth;
}

export default withAuth;
