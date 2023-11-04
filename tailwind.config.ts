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
							DEFAULT: '#3982c2',
							50: '#ebf3f9',
							75: '#aecce6',
							100: '#8cb7dc',
							200: '#5b97cc',
							300: '#3982c2',
							400: '#285b88',
							500: '#234f76',
							foreground: '#ffffff'
						},
						secondary: {
							DEFAULT: '#39a9c2',
							50: '#ebf6f9',
							75: '#aedce6',
							100: '#8ccddc',
							200: '#5bb8cc',
							300: '#39a9c2',
							400: '#287688',
							500: '#236776'
						},
						success: {
							DEFAULT: '#39c270',
							50: '#ebf9f1',
							75: '#aee6c4',
							100: '#8cdcac',
							200: '#5bcc88',
							300: '#39c270',
							400: '#28884e',
							500: '#237644'
						},
						warning: {
							DEFAULT: '#dda332',
							50: '#fcf6eb',
							75: '#f1d9ab',
							100: '#ebca88',
							200: '#e3b355',
							300: '#dda332',
							400: '#9b7223',
							500: '#87631f'
						},
						danger: {
							DEFAULT: '#c23939',
							50: '#f9ebeb',
							75: '#e6aeae',
							100: '#dc8c8c',
							200: '#cc5b5b',
							300: '#c23939',
							400: '#882828',
							500: '#762323'
						},
						neutral: {
							DEFAULT: '#5d6b82',
							0: 'ffffff',
							50: '#c2c7d0',
							75: '#a6aebb',
							100: '#7a8699',
							200: '#6b788e',
							300: '#5d6b82',
							400: '#505f79',
							500: '#42526d'
						},
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
