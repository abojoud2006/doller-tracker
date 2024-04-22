import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen grid grid-rows-[auto,_1fr] grid-cols-[1fr] items-start justify-center">
      <Header />
      {children}
    </main>
  );
}
