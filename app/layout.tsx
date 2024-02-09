import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from '@/theme/ThemeRegistry'
import AppProvider from "@/store/provider";


export const metadata: Metadata = {
  title: "Learning Licence App",
  description: "Learning Licence App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <ThemeRegistry >
          <body>
            {children}
          </body>
        </ThemeRegistry>
      </AppProvider>
    </html>
  );
}
