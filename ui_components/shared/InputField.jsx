import { ICONS } from "@/utils/images";
import Image from "next/image";
import React from "react";

const InputField = (props) => {
    const {
        label,
        type,
        className,
        inputClassName,
        name,
        id,
        placeholder,
        value,
        onChange,
        OnClear,
        min,
        step,
        autoComplete,
        maxLength,
        onKeyDown,
        required,
        onFocus,
        onBlur,
        inputRef,
        isSearch = false,
        searchIcon,
        rightText,
        inputMode,
        showClose,
    } = props;

    return (
        <div className={`relative ${className ?? ""}`}>
            {label && (
                <label className="paragraph_regular mb-1 block text-grey" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={inputRef}
                    type={type}
                    id={id}
                    name={name}
                    className={`paragraph2_regular placeholder:text-text-300 focus:ring-transparent block w-full rounded-large bg-grey3 px-5 py-[14px] text-black caret-black focus:outline-none ${
                        isSearch ? "pr-12" : ""
                    } ${inputClassName ?? ""}`}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    min={min}
                    step={step}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    onKeyDown={onKeyDown}
                    onWheel={() => document.activeElement.blur()}
                    required={required}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    inputMode={inputMode}
                />
                {isSearch && !value ? (
                    <Image
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        src={searchIcon}
                        alt="search"
                    />
                ) : null}
                {value && showClose ? (
                    <Image
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        src={ICONS.closeIcon}
                        alt="search"
                        onClick={OnClear}
                    />
                ) : null}
                {rightText ? (
                    <p className="paragraph_regular absolute right-10 top-1/2 -translate-y-1/2">
                        {rightText}
                    </p>
                ) : null}
            </div>
        </div>
    );
};
export default InputField;
