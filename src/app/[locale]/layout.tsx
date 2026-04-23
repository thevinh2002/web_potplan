import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/index.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import TopBar from "@/src/components/common/TopBar";
import Navigation from "@/src/components/common/Navigation";
import Footer from "@/src/components/common/Footer";
import Breadcrumb from "@/src/components/common/Breadcrumb";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return ["en", "vi"].map((locale) => ({ locale }));
}
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "VIETANHDUNG POTTERY",
  description: "Premium planters and pottery",
  icons: {
    icon: "/pictures/logo/logo.png",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <TopBar />
          <Navigation />
          <Breadcrumb />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
