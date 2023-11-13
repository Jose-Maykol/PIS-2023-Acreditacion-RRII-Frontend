import { IconProps } from '@/types/IconProps'

export default function FileIcon({ width, height, fill = 'fill-black' }: IconProps) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 24 24'
			className={fill}
		>
			<path fill-rule='evenodd' d='M12 2H6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8h-6a3 3 0 0 1-3-3V2zm9 7v-.172a3 3 0 0 0-.879-2.12l-3.828-3.83A3 3 0 0 0 14.172 2H14v6a1 1 0 0 0 1 1h6z' clip-rule='evenodd'/>
		</svg>
	)
}