import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                border: "var(--border)",
                input: "var(--input)",
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                heading: ["var(--font-space-grotesk)"],
            },
            animation: {
                blob: "blob 7s infinite",
                gradient: "gradient 8s ease infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                gradient: {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center"
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center"
                    },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
