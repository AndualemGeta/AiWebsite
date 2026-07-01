import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "Shining Star Electro Mechanical Work",
  description: "Professional corporate website for Shining Star Electro Mechanical Work, an Ethiopian engineering firm specializing in: Elevator and escalator installation, modernization, and maintenance. General electromechanical engineering solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
