import { IconProps } from '@/types/IconProps'

export default function StandardIcon({ width, height, fill = 'fill-black' }: IconProps) {
	return (
		<svg
			className={fill}
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 24 24'>
			<path d='M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7v2h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2H4a2 2 0 0 1-2-2V5zm18 11V5H4v11h16z'/>
		</svg>
	)
}