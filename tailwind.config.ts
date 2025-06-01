import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      inset: {
        '-135': '-135px',
      },
      colors: {
        gray: {   // gray as default (e.g., `text-gray`)
          800: 'rgb(20, 21, 21)',
          900: 'rgb(5, 5, 5)'  // Tailwind gray-800
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    gradientColorStops: false,
  },
}

export default config
