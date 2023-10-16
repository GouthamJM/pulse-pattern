import { RefObject, useEffect } from "react";
import { isMobile } from "..";

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const typeEvent = isMobile() ? `touchstart` : `mousedown`;
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener(typeEvent, listener);

        return () => {
            document.removeEventListener(typeEvent, listener);
        };
    }, [ref, handler]);
};
export { useOnClickOutside };
