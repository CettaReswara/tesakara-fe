import { Libre_Baskerville, Meow_Script } from "next/font/google";

export const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
});

export const meow = Meow_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-meow",
});