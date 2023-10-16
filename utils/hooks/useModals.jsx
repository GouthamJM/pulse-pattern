import { useEffect, useState } from "react";
import { signatureModalService } from "../store";

export const useModals = () => {
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

    useEffect(() => {
        const signatureSubscription = signatureModalService.modalState.subscribe(
            (isOpen) => {
                setIsSignatureModalOpen(isOpen);
            },
        );

        return () => {
            signatureSubscription.unsubscribe();
        };
    }, []);

    return {
        isSignatureModalOpen,
    };
};
