import Snow from "@/components/Snow";
import { libre, meow } from "./font";
import "./globals.css";

export const metadata = {
  title: "Wedding Invitation",
  description: "Intro page template",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libre.variable} ${meow.variable}`}>
      <body className="min-h-screen bg-rose-100 grid place-items-center">
        <Snow />
        {children}
      </body>
    </html>
  );
}