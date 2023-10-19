/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-var-requires */
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
		fontWeight: {
			regular: '400',
			medium: '500',
			bold: '700'
		},
		fontSize: {
			lg: ['21px', '20px'],
			base: ['16px', '20px'],
			sm: ['12px', '20px'],
			h1: ['36px', '20px'],
			h2: ['32px', '20px'],
			h3: ['28px', '20px']
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			fontFamily: {
				'BebasNeue': ['Bebas Neue', 'cursive'],
				'Montserrat': ['Montserrat', 'sans-serif'],
				'sans': ['Montserrat', 'sans-serif']
			}
		}
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: '#0284c7',
							foreground: '#000000'
						},
						focus: '#0284c7'
					}
				},
				light: {
					colors: {
						primary: {
							DEFAULT: '#0284c7',
							foreground: '#ffffff'
						},
						focus: '#0284c7',
						default: {
							DEFAULT: '#ffffff',
							foreground: '#000000'
						}
					}
				}
			}
		})
	]
}
export default config
