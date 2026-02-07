import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "منصة EduHub - منصتك الأكاديمية الذكية المتكاملة",
  description: "رفيقك الأكاديمي الشامل للتعلم والتعاون والنمو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} antialiased`}>
        {children}
        <Toaster 
          position="top-left"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              fontFamily: cairo.style.fontFamily,
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
