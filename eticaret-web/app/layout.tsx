import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Ticaret Platformu",
  description: "Modern E-Ticaret Uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* 2. Tüm siteyi Provider kutusunun içine alıyoruz */}
        <CartProvider>
          {/* Üst Menü her sayfada sabit kalacak */}
          <Navbar />

          {/* children: O an bulunduğumuz sayfayı (Ana sayfa, iletişim vb.) temsil eder */}
          <main className="main-container">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}