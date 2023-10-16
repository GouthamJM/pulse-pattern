"use client";
import Onboarding from "@/ui_components/onboarding/Onboard";
import { useEffect, useState } from "react";

function withAuth(Component) {
    const Auth = (props) => {
        const [loader, setLoader] = useState(true);
        const [loggedIn, setLoggedIn] = useState(false);

        useEffect(() => {
            setLoader(false);

            const isLoggedIn = localStorage.getItem("isLoggedIn");
            setLoggedIn(isLoggedIn == "true");
        }, []);

        if (loader) return <div>Loading...</div>;
        console.log(loggedIn, "loggedIn");
        // If user is not logged in, return login component
        if (!loggedIn) {
            return (
                <div className="app mobView">
                    <Onboarding />
                </div>
            );
        }

        // If user is logged in, return original component
        return <Component {...props} />;
    };
    return Auth;
}

export default withAuth;
