import { IBM_Plex_Sans_Arabic, Geist_Mono } from "next/font/google";

// #region fonts
// خط واحد للعربية والإنجليزية: IBM Plex Sans Arabic فيه الحروف اللاتينية أيضاً.
// الخط ليس variable، لذلك نحدد الأوزان التي نستخدمها فقط (كل وزن = ملف إضافي).
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${plexArabic.variable} ${geistMono.variable}`;
// #endregion fonts
