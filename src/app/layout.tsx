import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/index.css";
import TopBar from "@/src/components/common/TopBar";
import Navigation from "@/src/components/common/Navigation";
import Footer from "@/src/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aurora Pots",
  description: "Premium planters and pottery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
