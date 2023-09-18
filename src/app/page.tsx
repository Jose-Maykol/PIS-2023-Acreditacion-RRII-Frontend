'use client'

import { Button } from '@nextui-org/react'
import CustomSelect from '@/components/selects/CustomSelect'

export default function Home() {
	return (
		<main>
			<section className='relative py-40 min-h-screen w-screen h-screen'>
				<div>
					<Button onClick={() => alert("Hello world")}>Click me</Button>
					<CustomSelect options={[{label: "dog", value: "dog"}, {label: "cat", value: "cat"}]} onChange={() => {}} />
				</div>
			</section>
		</main>
	)
}