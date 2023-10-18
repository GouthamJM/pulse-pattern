import { ICONS } from "@/utils/images";
import Image from "next/image";
import { useRouter } from "next/router";

const BackBtn = ({ className, onClick }) => {
    const router = useRouter();
    if (!onClick) {
        onClick = () => router.back();
    }
    return (
        <div onClick={onClick} className={`${className ?? ""}`}>
            <Image src={ICONS.arrowBack} />
        </div>
    );
};

export default BackBtn;
