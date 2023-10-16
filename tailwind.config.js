/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./utils/**/*.{js,jsx,ts,tsx}",
        "./ui_components/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
                sans: ["Open Sans", "sans-serif"],
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                white: "#ffffff",
                green: "#67CA71",
                darkGreen: "#152817",
                grey: "#96A398",
                grey2: "#D1DBD2",
                grey3: "#F2F7F3",
                grey4: "#FEFFFE",
                grey5: "#E1F4E3",
                grey6: "#FBFFF9",
                grey7: "#B3E4B8",
            },

            zIndex: {
                99: "99",
                1000: "1000",
                9999: "9999",
            },
            borderRadius: {
                large: "16px",
                "4xl": "28px",
            },
            screens: {
                xs: "440px",
                sm: "600px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                xxl: "1536px",
            },
            gridTemplateColumns: {
                auto: "repeat(auto-fit, minmax(0, 1fr))",
            },
            container: {
                padding: {
                    DEFAULT: "1.25rem",
                    xl: "1.25rem",
                    "2xl": "1.25rem",
                },
            },
        },
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
        boxShadow: ["responsive", "hover", "focus"],
    },

    corePlugins: {
        backdropOpacity: false,
        backgroundOpacity: false,
        borderOpacity: false,
        divideOpacity: false,
        ringOpacity: false,
        textOpacity: false,
    },
};
