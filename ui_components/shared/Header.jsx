import { useRouter } from "next/router";
import { getFromLocalStorage, getNounAvatar, saveToLocalStorage } from "../../utils";
import { ICONS } from "@/utils/images";
import Image from "next/image";
import usePrivyWalletDetail from "@/utils/hooks/wallet/usePrivyWalletDetail";
import { scrollSepolia, polygonZkEvmTestnet } from "wagmi/chains";
import { useEffect, useState } from "react";

const Header = () => {
    const { walletDetail } = usePrivyWalletDetail();
    const selchain = getFromLocalStorage("selectedChain");
    console.log(selchain, "selchain");
    const [selectedChain, setSelectedChain] = useState();
    const handleChainSwitch = async (chainId) => {
        console.log(walletDetail.chainId, "chain id");
        console.log("🚀 ~ file: Header.jsx:12 ~ handleChainSwitch ~ chainId:", chainId);
        const chains = [scrollSepolia, polygonZkEvmTestnet];
        console.log("🚀 ~ file: Header.jsx:13 ~ handleChainSwitch ~ chains:", chains);
        const selChain = chains.filter((val) => String(val.id) === String(chainId))[0];
        console.log(
            "🚀 ~ file: Header.jsx:15 ~ handleChainSwitch ~ selChahhuhuin:",
            selChain,
        );
        await walletDetail.switchChain(chainId);
        saveToLocalStorage("selectedChain", selChain);
    };

    useEffect(() => {
        if (walletDetail) {
            const chains = [scrollSepolia, polygonZkEvmTestnet];
            console.log("🚀 ~ file: Header.jsx:13 ~ handleChainSwitch ~ chains:", chains);
            const chnId = walletDetail.chainId.split(":")[1];
            const selChain = chains.filter((val) => String(val.id) === String(chnId))[0];
            setSelectedChain(selChain);
        }
    }, [walletDetail]);

    return (
        <header className="fixed top-0 bg-white flex px-4 justify-center items-center  w-[420px] z-30 ">
            <div className="w-full flex items-center justify-between px-5 py-4">
                <div
                    className="paragraph_bold cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <Image src={ICONS.Logo} />
                </div>
                <div className="flex items-center gap-2">
                    <details className="dropdown">
                        <summary className="cursor-pointer border border-black py-1 px-2 rounded-full custom-ellipsis">
                            {selectedChain ? selectedChain.name : ""}
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li
                                onClick={() => {
                                    handleChainSwitch(polygonZkEvmTestnet.id);
                                }}
                            >
                                {/* <a>{"Polygon ZKevm"}</a> */}
                                <Image
                        className="h-14" src={ICONS.polygonLogo} />
                            </li>
                            <li
                                onClick={() => {
                                    handleChainSwitch(scrollSepolia.id);
                                }}
                            >
                                {/* <a>{"Scroll Sepolia"}</a> */}
                                <Image
                        className="h-14" src={ICONS.scrollLogo} />
                            </li>
                        </ul>
                    </details>
                    <Image className="w-8 h-8 cursor-pointer" src={ICONS.Notification} />
                    <Image
                        className="w-8 h-8 rounded-full cursor-pointer"
                        width={32}
                        height={32}
                        src={
                            !walletDetail
                                ? ICONS.Profile
                                : getNounAvatar(walletDetail.address)
                        }
                    />
                </div>
            </div>
        </header>
    );
};
export default Header;
