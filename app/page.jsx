
import Link from 'next/link'

export default function Home() {
  return (
    <section className="flex flex-row h-screen">
        <div className="w-1/5 h-full bg-red-500">
            <h1>ASDAd</h1>
        </div>
        <div className="w-4/5 h-full">
            <Link href="/create-your-design">Go to Create Your Design</Link>
        </div>
    </section>
  );
}
