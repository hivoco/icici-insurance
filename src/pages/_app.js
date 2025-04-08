import "@/styles/globals.css";

import { Inter, Mulish } from "next/font/google";

// Configure fonts with variable weights
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <Component
      {...pageProps}
      className={`${inter.variable} ${mulish.variable}`}
    />
  );
}
