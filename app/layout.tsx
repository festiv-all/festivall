import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
// import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

// const notoSansKr = Noto_Sans_KR({
//   weight: ["500"],
//   subsets: ["latin"],
// });

const pretendard = localFont({
  src: "./fonts/Pretendard.woff",
  variable: "--font-pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Find your life in Festivall",
  description: "All exciting festivals you wanted",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} ${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              className: "min-w-[280px]",
              duration: 4000,
              style: {
                fontSize: "0.85rem",
              },
            }}
            containerStyle={{
              top: 70,
              left: 50,
              bottom: 50,
              right: 50,
            }}
          />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
