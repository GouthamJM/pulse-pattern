import { ICONS } from "@/utils/images";
import Image from "next/image";

export default function Greet() {
    return (
        <div className="flex items-start gap-2">
            <Image
                className="rounded-t-2xl rounded-br rounded-bl-2xl"
                width={50}
                height={50}
                src={ICONS.dummyProfile}
                alt="profile"
            />
            <p className="paragraph_regular">Good morning!</p>
        </div>
    );
}
