import animate from "tailwindcss-animate";

export const darkMode = ["class"];

export const content = [
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"*.{js,ts,jsx,tsx,mdx}",
	"app/**/*.{ts,tsx}",
	"components/**/*.{ts,tsx}",
];

export const theme = {
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
			purple: {
				light: "#7777AA",
			},
			blue: {
				sky: "#77BBDD",
			},
			yellow: {
				soft: "#FFDD88",
			},
			green: {
				light: "#77DD77",
			},
			pink: {
				soft: "#FF8899",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
		backgroundImage: {
			"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
		},
	},
};

export const plugins = [animate];
