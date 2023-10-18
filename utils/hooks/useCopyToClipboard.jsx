import { useState } from "react";
import { toast } from "react-toastify";
const useCopyToClipboard = () => {
    const [copiedText, setCopiedText] = useState(null);

    const copy = async (text) => {
        if (!navigator?.clipboard) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "absolute";
            textArea.style.left = "-999999px";
            document.body.prepend(textArea);
            textArea.select();
            toast("Copied to clipboard");
            try {
                document.execCommand("copy");
            } catch (error) {
                console.error(error);
            } finally {
                textArea.remove();
            }

            return false;
        }

        try {
            await navigator?.clipboard?.writeText(text);
            setCopiedText?.(text);
            toast("Copied to clipboard");
            return true;
        } catch (error) {
            console.warn("Copy failed", error);
            setCopiedText(null);
            return false;
        }
    };

    return [copiedText, copy];
};

export { useCopyToClipboard };
