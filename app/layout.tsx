import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { inter } from '@/app/fonts';

export const metadata: Metadata = {
  title: {
    default: 'Devin Notes',
    template: '%s · Devin Notes',
  },
  description: 'An editorial blog built with Next.js, markdown, and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Script id="theme-init" strategy="beforeInteractive">{`(() => { try { const stored = localStorage.getItem('theme'); const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const theme = stored === 'dark' || stored === 'light' ? stored : (systemDark ? 'dark' : 'light'); document.documentElement.classList.toggle('dark', theme === 'dark'); } catch (e) {} })()`}</Script>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
