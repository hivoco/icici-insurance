import { AudioProvider } from "@/context/AudioContext";
import "@/styles/globals.css";
import Head from 'next/head'
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
    <AudioProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <Component
        {...pageProps}
        className={`${inter.variable} ${mulish.variable}`}
      />
    </AudioProvider>
  );
}
