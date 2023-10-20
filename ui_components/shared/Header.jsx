import { getFromLocalStorage, getNounAvatar } from "../../utils";
import { ICONS } from "@/utils/images";
import Image from "next/image";

const Header = () => {
    const router = useRouter();
    const address = getFromLocalStorage("address");
    return (
        <header className="fixed top-0 bg-white flex px-4 justify-center items-center  w-[420px] z-30 ">
<<<<<<< HEAD
            <div className="w-full flex items-center justify-between px-5 py-4">
                <div
                    className="paragraph_bold cursor-pointer"
                    onClick={() => router.push("/")}
                >
=======
            <div className="w-full flex items-center justify-between py-4">
                <div className="paragraph_bold">
>>>>>>> ab6b7b4 (header ui update)
                    <Image src={ICONS.Logo} />
                </div>
                <div className="flex items-center gap-2">
                    <Image className="w-8 h-8 cursor-pointer" src={ICONS.Notification} />
                    <Image
                        className="w-8 h-8 rounded-full cursor-pointer"
                        width={32}
                        height={32}
                        src={
                            typeof address === "undefined"
                                ? ICONS.Profile
                                : getNounAvatar(address)
                        }
                    />
                </div>
            </div>
        </header>
    );
};
export default Header;
