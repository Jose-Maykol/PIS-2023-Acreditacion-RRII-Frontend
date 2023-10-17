import { IconProps } from '@/types/IconProps'

export default function ActivateUserIcon({ width, height, fill = 'fill-black' }: IconProps) {
	return (
		<svg
			className={fill}
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 24 24'>
			<path d='M21.5 9h-5l1.86-1.86A7.991 7.991 0 0 0 12 4c-4.42 0-8 3.58-8 8c0 1.83.61 3.5 1.64 4.85c1.22-1.4 3.51-2.35 6.36-2.35c2.85 0 5.15.95 6.36 2.35A7.945 7.945 0 0 0 20 12h2c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2c3.14 0 5.95 1.45 7.78 3.72L21.5 4v5M12 7c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3Z'/>
		</svg>
	)
}