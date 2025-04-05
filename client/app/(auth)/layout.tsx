import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Memories",
  description: "Create and share your memories!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main className="flex justify-center items-center h-screen bg-[#161B22]">
          {children}
        </main>
      </body>
    </html>
  );
}
