import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchEnsAddress } from "@wagmi/core";
import { Button, InputField } from "@/ui_components/shared";
import { trimAddress } from "@/utils";
import { useDebounce } from "@/utils/hooks";
import { isValidAddressOrEnsDomain } from "@/utils/address";
import { useRouter } from "next/router";
import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import { ICONS } from "@/utils/images";
import Image from "next/image";

const NewChat = () => {
    const router = useRouter();
    const navigate = router.push;
    const [inputValue, setInputValue] = useState("");
    const [isExist, setIsExist] = useState(false);
    const [loader, setLoader] = useState(false);
    const [isInviting, setIsInviting] = useState(false);
    const [searchValue] = useDebounce(inputValue, 300);

    const handleChangeInput = (e) => {
        setInputValue(e);
    };

    const resolveAddress = async (inviteeAddress) => {
        if (isValidAddressOrEnsDomain(inviteeAddress)) {
            const resolvedAddress = await fetchEnsAddress({
                name: inviteeAddress,
            });

            if (resolvedAddress) {
                return `eip155:1:${resolvedAddress}`;
            }
        }

        return `eip155:1:${inviteeAddress}`;
    };

    const invite = useCallback(async (inviteeAddress) => {
        setIsInviting(true);

        try {
            navigate(
                `/messages/chat/${resolvedAddress}?topic=invite:pending:${resolvedAddress}`,
            );
        } catch (error) {
            console.log(error, "error");
        } finally {
            setIsInviting(false);
        }
    }, []);

    useEffect(() => {
        const checkIfExist = async () => {
            if (!isValidAddressOrEnsDomain(searchValue)) {
                return false;
            }

            try {
                setLoader(true);
                const resolvedAddress = await resolveAddress(searchValue);
                setLoader(false);

                return true;
            } catch {
                setLoader(false);

                return false;
            }
        };

        checkIfExist().then((exist) => {
            setIsExist(exist);
        });
    }, [searchValue]);
    const disabledReason = useMemo(() => {
        const truncatedQuery = trimAddress(searchValue, 5);

        if (!isValidAddressOrEnsDomain(searchValue)) {
            return `Address ${truncatedQuery} not valid ethereum domain name or address`;
        } else if (isInviting) {
            return `Currently inviting ${truncatedQuery}`;
        } else if (!isExist) {
            return `${truncatedQuery} not registered on chat keyserver`;
        } else if (searchValue.length === 0) {
            return `Need to provide an address to invite`;
        }

        return ``;
    }, [searchValue, isInviting, isExist]);

    const isDisabled = useMemo(() => Boolean(disabledReason), [disabledReason]);

    return (
        <div className="container mx-auto h-full">
            <div className="h-full w-full text-center">
                <div className="flex items-center gap-x-4 py-6">
                    <Image src={ICONS.Icon} alt="chain_icon" className="h-10" />
                    <div className="relative w-full">
                        <InputField
                            className="w-full"
                            placeholder="ENS Username (vitalik.eth) / Wallet Address (0x423…)"
                            onChange={(e) => handleChangeInput(e.target.value)}
                        />
                        {loader && (
                            <div className="spinner absolute right-4 top-4 w-6 h-6 rounded-full"></div>
                        )}
                    </div>
                </div>
                <Button
                    className="min-w-[200px] rounded-lg mx-auto"
                    type="submit"
                    label="Send invite"
                    variant={"primary"}
                    onClick={() => invite(searchValue)}
                    disabled={isDisabled}
                />
            </div>
        </div>
    );
};
export default PageLayoutHoc(NewChat);
