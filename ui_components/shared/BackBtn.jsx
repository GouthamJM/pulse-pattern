import { ICONS } from "@/utils/images";
import Image from "next/image";
import { useRouter } from "next/router";

const BackBtn = ({ className }) => {
    const router = useRouter();
    return (
        <div onClick={() => router.back()} className={`${className ?? ""}`}>
            <Image src={ICONS.arrowBack} />
        </div>
    );
};

export default BackBtn;
