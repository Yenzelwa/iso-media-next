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
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      inset: {
        '-135': '-135px',
      },
    },
      colors: {
        dark: '#171717',
        red:'#7f1d1d',
        black:'rgb(17 17 17)',
        gray:'#666'
      }
  },
  plugins: [],
  corePlugins: {
    // ...other core plugins
    gradientColorStops: false, 
  },
}
export default config
