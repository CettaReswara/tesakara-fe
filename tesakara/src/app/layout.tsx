import Snow from "@/components/Snow";
import { libre, meow } from "./font";
import "./globals.css";

export const metadata = {
  title: "Tesakara",
  description: "Syari wedding invitation",
  // viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libre.variable} ${meow.variable}`}>
      <head>
        {/* preconnect */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body className="min-h-screen bg-rose-100 grid place-items-center">
        <Snow />
        {children}
      </body>
    </html>
  );
}