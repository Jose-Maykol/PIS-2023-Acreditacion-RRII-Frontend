import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <section className="relative py-40 min-h-screen w-screen h-screen">
        <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        />
      </section>
    </main>
  )
}