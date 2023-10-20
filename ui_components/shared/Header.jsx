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
                        <summary className="cursor-pointer  py-1 rounded-full flex items-center justify-center">
                            {/* {selectedChain ? selectedChain.name : ""} */}
                            <Image
                                    className="w-10 h-10 border border-black rounded-full p-1"
                                    src={selectedChain ? selectedChain.id === 1442 ? ICONS.polygonLogo : ICONS.scrollLogo : ICONS.scrollLogo}
                                />
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[50] bg-base-100 rounded-box w-[100px] ">
                            <li className="flex items-center justify-center"
                                onClick={() => {
                                    handleChainSwitch(polygonZkEvmTestnet.id);
                                }}
                            >
                                {/* <a>{"Polygon ZKevm"}</a> */}
                                <Image
                                    className="w-[70px] h-13 rounded-full"
                                    src={ICONS.polygonLogo}
                                />
                            </li>
                            <li className="flex items-center justify-center"
                                onClick={() => {
                                    handleChainSwitch(scrollSepolia.id);
                                }}
                            >
                                {/* <a>{"Scroll Sepolia"}</a> */}
                                <Image
                                    className="w-[70px] h-13 rounded-full"
                                    src={ICONS.scrollLogo}
                                />
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
