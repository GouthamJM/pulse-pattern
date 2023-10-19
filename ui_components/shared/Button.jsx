import React from "react";

const Button = ({
    label,
    disabled,
    children,
    className,
    type,
    onClick,
    variant,
    ...props
}) => {
    return (
        <button
            type={type}
            className={`relative items-center justify-center gap-2 rounded-3xl transition-all duration-100 inline-flex ease-in-out px-6 py-2.5 ${
                variant === "primary" ? "bg-black text-grey3" : ""
            } ${
                variant === "ghost" ? "bg-transparent text-black border border-black" : ""
            } ${variant === "secondary" ? "bg-green text-black" : ""}  ${
                className ? className : ""
            }`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {label ?? children ?? null}
        </button>
    );
};

export default Button;
