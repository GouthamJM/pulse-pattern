import { useRouter } from "next/router";

const Footer = () => {
    const router = useRouter();
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-slate-100">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="paragraph_bold" onClick={() => router.push("/messages")}>
                    Messages
                </div>
                <div className="paragraph_bold" onClick={() => router.push("/settings")}>
                    Settings
                </div>
            </div>
        </footer>
    );
};
export default Footer;
