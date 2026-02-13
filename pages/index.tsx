import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <Layout>
      <div
        className={`${geistSans.className} ${geistMono.className} min-h-[calc(100vh-64px)] flex items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
      >

        Helo Here
      </div>
    </Layout>
  );
}
