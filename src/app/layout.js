import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { CartProvider } from "@/CartContext";
 // 👈 import the Providers wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MockShark — Affordable High-Quality Mockups for Designers",
  description: "Empowering designers with high-quality mockups without the hefty price tag. Explore our wide range of affordable and professional mockup templates.",
  keywords: [
    "MockShark",
    "mockups",
    "free mockups",
    "affordable mockups",
    "premium mockups",
    "PSD mockups",
    "mockup templates",
    "design resources"
  ],
 
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <CartProvider>
         {children}
        </CartProvider> {/* 👈 wrap with Providers */}
       
      </body>
    </html>
  );
}
