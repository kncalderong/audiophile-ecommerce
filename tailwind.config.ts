import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontSize: {
        body: ["15px", { letterSpacing: "2.5px" }],
        h1: [
          "56px",
          { lineHeight: "58px", letterSpacing: "2px", fontWeight: 600 },
        ],
        h2: [
          "40px",
          { lineHeight: "44px", letterSpacing: "1.5px", fontWeight: 600 },
        ],
        h3: [
          "32px",
          { lineHeight: "36px", letterSpacing: "1.15px", fontWeight: 600 },
        ],
        h4: [
          "28px",
          { lineHeight: "38px", letterSpacing: "2px", fontWeight: 600 },
        ],
        h5: [
          "24px",
          { lineHeight: "3px", letterSpacing: "1.7px", fontWeight: 600 },
        ],
        h6: [
          "18px",
          { lineHeight: "24px", letterSpacing: "1.3px", fontWeight: 600 },
        ],
        overline: ["14px", { lineHeight: "19px", letterSpacing: "10px" }],
        subtitle: ["13px", { lineHeight: "25px", letterSpacing: "1px" }],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "store-orange-dark": "hsl(22, 65%, 57%)",
        "store-orange-light": "hsl(21, 94%, 75%)",
        "store-gray-strong": "hsl(0, 0%, 6%)",
        "store-gray-mid": "hsl(0, 0%, 95%)",
        "store-gray-light": "hsl(0, 0%, 98%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
