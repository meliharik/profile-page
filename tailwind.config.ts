import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
        'sf-display': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'sf-text': ['SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'sf-large': ['34px', { lineHeight: '41px', letterSpacing: '0.37px' }],
        'sf-title1': ['28px', { lineHeight: '34px', letterSpacing: '0.36px' }],
        'sf-title2': ['22px', { lineHeight: '28px', letterSpacing: '0.35px' }],
        'sf-title3': ['20px', { lineHeight: '25px', letterSpacing: '0.38px' }],
        'sf-headline': ['17px', { lineHeight: '22px', letterSpacing: '-0.41px' }],
        'sf-body': ['17px', { lineHeight: '22px', letterSpacing: '-0.41px' }],
        'sf-callout': ['16px', { lineHeight: '21px', letterSpacing: '-0.32px' }],
        'sf-subhead': ['15px', { lineHeight: '20px', letterSpacing: '-0.24px' }],
        'sf-footnote': ['13px', { lineHeight: '18px', letterSpacing: '-0.08px' }],
        'sf-caption1': ['12px', { lineHeight: '16px', letterSpacing: '0px' }],
        'sf-caption2': ['11px', { lineHeight: '13px', letterSpacing: '0.07px' }],
      },
      fontWeight: {
        'sf-ultralight': '100',
        'sf-thin': '200',
        'sf-light': '300',
        'sf-regular': '400',
        'sf-medium': '500',
        'sf-semibold': '600',
        'sf-bold': '700',
        'sf-heavy': '800',
        'sf-black': '900',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'float1': 'float1 18s ease-in-out infinite',
        'float2': 'float2 20s ease-in-out infinite',
        'float3': 'float3 22s ease-in-out infinite',
        'float4': 'float4 19s ease-in-out infinite',
        'float5': 'float5 21s ease-in-out infinite',
        'float6': 'float6 17s ease-in-out infinite',
        'pulse-custom': 'pulse-custom 3s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'float1': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
          '25%': { transform: 'translate(80px, -120px) rotate(90deg) scale(1.4)' },
          '50%': { transform: 'translate(-60px, -200px) rotate(180deg) scale(0.6)' },
          '75%': { transform: 'translate(-140px, -80px) rotate(270deg) scale(1.6)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg) scale(1)' }
        },
        'float2': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate(-100px, 160px) rotate(120deg) scale(0.5)' },
          '66%': { transform: 'translate(120px, 80px) rotate(240deg) scale(1.8)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg) scale(1)' }
        },
        'float3': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
          '20%': { transform: 'translate(60px, -100px) rotate(72deg) scale(1.5)' },
          '40%': { transform: 'translate(-80px, -160px) rotate(144deg) scale(0.7)' },
          '60%': { transform: 'translate(-120px, 40px) rotate(216deg) scale(1.7)' },
          '80%': { transform: 'translate(100px, 140px) rotate(288deg) scale(0.4)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg) scale(1)' }
        },
        'float4': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
          '30%': { transform: 'translate(-160px, -60px) rotate(108deg) scale(2.0)' },
          '60%': { transform: 'translate(140px, -140px) rotate(216deg) scale(0.3)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg) scale(1)' }
        },
        'float5': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
          '25%': { transform: 'translate(120px, 80px) rotate(90deg) scale(0.6)' },
          '50%': { transform: 'translate(-40px, 180px) rotate(180deg) scale(1.9)' },
          '75%': { transform: 'translate(-180px, -40px) rotate(270deg) scale(0.5)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg) scale(1)' }
        },
        'float6': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
          '40%': { transform: 'translate(100px, -180px) rotate(144deg) scale(1.6)' },
          '80%': { transform: 'translate(-140px, 100px) rotate(288deg) scale(0.4)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg) scale(1)' }
        },
        'pulse-custom': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.05)' }
        },
        'gradient': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

// Import function for flattening color palette
function flattenColorPalette(colors: any): Record<string, string> {
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == "object"
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) =>
            ({
              [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
            })
          )
        : [{ [`${color}`]: values }]
    )
  );
}

export default config; 