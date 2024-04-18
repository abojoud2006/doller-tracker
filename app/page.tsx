import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-20">
      <Link href="/month">Current Month</Link>
      <Link href="/year">Year</Link>
    </main>
  );
}
