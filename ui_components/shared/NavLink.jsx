import { useRouter } from "next/router";
import React, { FC } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({ to, children, className, goBack, ...props }) => {
    const router = useRouter();
    return (
        <>
            {goBack ? (
                <div onClick={() => router.back()} className={`${className ?? ""}`}>
                    {children}
                </div>
            ) : (
                <RouterNavLink {...props} to={to} className={`${className ?? ""}`}>
                    {children}
                </RouterNavLink>
            )}
        </>
    );
};

export default NavLink;
