import { getNounAvatar } from "@/utils";
import usePrivyWalletDetail from "@/utils/hooks/wallet/usePrivyWalletDetail";
import Image from "next/image";

export default function Greet() {
    const { walletDetail } = usePrivyWalletDetail();
    return (
        <div className="flex items-start gap-2">
            {walletDetail?.address && (
                <Image
                    className="rounded-t-2xl rounded-br rounded-bl-2xl"
                    width={50}
                    height={50}
                    src={getNounAvatar(walletDetail.address)}
                    alt="profile"
                />
            )}
            <p className="paragraph_regular">Good morning!</p>
        </div>
    );
}
