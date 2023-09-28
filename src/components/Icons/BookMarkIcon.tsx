import { IconProps } from '@/types/IconProps'

export default function BookMarkIcon({ width, height, fill = 'fill-black' }: IconProps) {
	return (
		<svg
			className={fill}
			xmlns='http://www.w3.org/2000/svg'
			width= {width}
			height= {height}
			viewBox='0 0 24 24'>
			<path d='M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Z'/>
		</svg>
	)
}