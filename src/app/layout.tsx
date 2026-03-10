import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "imersa | Experiencias interativas para imoveis",
  description:
    "Landing page skeleton da imersa para o mercado brasileiro, com foco em demos, experiencia visual e publicacao simples.",
};

const bodyClassName = `${spaceGrotesk.variable} ${inter.variable} antialiased`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}
