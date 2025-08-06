/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New "natury" colors
        earthy: {
          50: "hsl(30, 100%, 98%)",
          100: "hsl(30, 100%, 95%)",
          200: "hsl(30, 100%, 90%)",
          300: "hsl(30, 100%, 80%)",
          400: "hsl(30, 100%, 60%)",
          500: "hsl(30, 100%, 40%)", // Main earthy tone
          600: "hsl(30, 100%, 30%)",
          700: "hsl(30, 100%, 20%)",
          800: "hsl(30, 100%, 15%)",
          900: "hsl(30, 100%, 10%)",
          950: "hsl(30, 100%, 5%)",
          input: "hsl(30, 100%, 95%)", // Very light beige input
        },
        forest: {
          50: "hsl(120, 60%, 98%)",
          100: "hsl(120, 60%, 95%)",
          200: "hsl(120, 60%, 90%)",
          300: "hsl(120, 60%, 80%)",
          400: "hsl(120, 60%, 60%)",
          500: "hsl(120, 60%, 40%)", // Main forest green
          600: "hsl(120, 60%, 30%)",
          700: "hsl(120, 60%, 20%)",
          800: "hsl(120, 60%, 15%)",
          900: "hsl(120, 60%, 10%)",
          950: "hsl(120, 60%, 5%)",
        },
        stone: {
          50: "hsl(210, 20%, 98%)",
          100: "hsl(210, 20%, 95%)",
          200: "hsl(210, 20%, 90%)",
          300: "hsl(210, 20%, 80%)",
          400: "hsl(210, 20%, 60%)",
          500: "hsl(210, 20%, 40%)", // Main stone grey
          600: "hsl(210, 20%, 30%)",
          700: "hsl(210, 20%, 20%)",
          800: "hsl(210, 20%, 15%)",
          900: "hsl(210, 20%, 10%)",
          950: "hsl(210, 20%, 5%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
