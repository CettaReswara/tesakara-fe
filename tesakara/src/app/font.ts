import { Libre_Baskerville, Meow_Script, Poppins, Gulzar, Berkshire_Swash, Lexend } from "next/font/google";

export const lexend = Lexend({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-lexend",
  display: "swap",
})

export const berkshire = Berkshire_Swash({
  weight: "400", 
  subsets: ["latin"],
});

export const gulzar = Gulzar({
  subsets: ["arabic"], 
  weight: "400",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"], 
  // "200" = ExtraLight
  variable: "--font-poppins",
});

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