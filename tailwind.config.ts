import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')
const { nextui } = require('@nextui-org/react')

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		colors: {
			...colors
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			fontFamily: {
				'bebas-neue': ['Bebas Neue', 'cursive'],
				'montserrat': ['Montserrat', 'sans-serif']
			}
		}
	},
	darkMode: 'class',
	plugins: [
		nextui()
	]
}
export default config
