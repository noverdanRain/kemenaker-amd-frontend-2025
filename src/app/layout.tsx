import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import ClientProvider from "./ClientProvider";
import "./globals.css";

const outfitSans = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Galang Arsandy - Test Frontend Magang",
    description: "Dibuat untuk keperluan test frontend magang",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${outfitSans.variable} ${geistMono.variable} antialiased`}
            >
                <ClientProvider>{children}</ClientProvider>
            </body>
        </html>
    );
}
