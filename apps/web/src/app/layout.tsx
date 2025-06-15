import type { Metadata } from "next";
import { Geist, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import '@fontsource-variable/unbounded';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Las Cámaras del Dragon",
  description:
    "Las Cámaras del Dragon, un lugar donde agendar tu cita con los mejores fotógrafos de la ciudad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${unbounded.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
