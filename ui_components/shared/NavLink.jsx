import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavLink = ({ to, children, className, goBack, ...props }) => {
    const router = useRouter();
    return (
        <>
            <div onClick={() => router.back()} className={`${className ?? ""}`}>
                {children}
            </div>
        </>
    );
};

export default NavLink;
