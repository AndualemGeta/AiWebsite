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
  title: "Shining Star Electro Mechanical Works | Premier Vertical Transport & Engineering",
  description: "Professional corporate website for Shining Star Electro Mechanical Works, an Ethiopian engineering firm specializing in elevator and escalator supply, installation, modernization, and maintenance.",
  icons: {
    icon: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  localStorage.setItem('theme', 'light');
                  document.documentElement.classList.remove('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 selection:bg-[#f37021] selection:text-white">
        {children}
      </body>
    </html>
  );
}
