import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brain Game – A Fun and Interactive Web Experience",
  description: "This lightweight and engaging game, built with Next.js, demonstrates the potential for creating interactive and dynamic web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="lg:max-w-3xl mx-auto flex flex-col h-screen px-4">
          <Header />
          <main className="h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}