import { IconProps } from '@/types/IconProps'

export default function UnsupportedFileIcon({ width, height, fill = 'fill-black' }: IconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={fill}
			width={width}
			height={height}
			viewBox='0 0 90 68'>
			<path d='M51,35h8c2.2,0,4,1.8,4,4v8c0,1.1,0.9,2,2,2s2-0.9,2-2V37c0-11-9-20-20-20H28c-2.8,0-5,2.2-5,5v46c0,2.8,2.2,5,5,5h17  c1.1,0,2-0.9,2-2s-0.9-2-2-2H28c-0.6,0-1-0.4-1-1V22c0-0.6,0.4-1,1-1h17c2.2,0,4,1.8,4,4v8C49,34.1,49.9,35,51,35z M62,31.6  c-0.9-0.4-2-0.6-3-0.6h-6v-6c0-1.1-0.2-2.1-0.6-3C56.9,23.6,60.4,27.1,62,31.6z'/>
			<path d='M63,53c-6.6,0-12,5.4-12,12c0,6.6,5.4,12,12,12s12-5.4,12-12C75,58.4,69.6,53,63,53z M63,57c1.5,0,2.9,0.4,4.1,1.1  L56.1,69.1C55.4,67.9,55,66.5,55,65C55,60.6,58.6,57,63,57z M63,73c-1.5,0-2.9-0.4-4.1-1.1l10.9-10.9c0.7,1.2,1.1,2.6,1.1,4.1  C71,69.4,67.4,73,63,73z'/>
		</svg>
	)
}
