import { IconProps } from '@/types/IconProps'

export default function BookMarkIcon({ width, height, fill = 'fill-black', variant = 'solid' }: IconProps) {
	return (
		<svg
			className={fill}
			xmlns='http://www.w3.org/2000/svg'
			width= {width}
			height= {height}
			viewBox={variant === 'solid' ? '0 0 24 24' : '0 0 384 512'}>
			{variant === 'solid' ? (
			  <path d='M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Z'/>
			) : (
				<path d="M0 48C0 21.5 21.5 0 48 0H336c26.5 0 48 21.5 48 48V489.9c0 12.2-9.9 22.1-22.1 22.1c-4.4 0-8.6-1.3-12.3-3.7L192 403.2 34.4 508.3c-3.6 2.4-7.9 3.7-12.3 3.7C9.9 512 0 502.1 0 489.9V48zM48 32c-8.8 0-16 7.2-16 16V471.4L183.1 370.7c5.4-3.6 12.4-3.6 17.8 0L352 471.4V48c0-8.8-7.2-16-16-16H48z"/>
			)}
		</svg>
	)
}