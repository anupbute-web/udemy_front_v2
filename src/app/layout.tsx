// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar"; // 👈 Ye import add kiya

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduStream AI | Microservices SaaS",
  description: "Advanced EdTech Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* 👈 Navbar yahan top pe add kiya */}
          <Navbar /> 
          
          {/* Baaki saare pages (Home, Login, Course) iske andar render honge */}
          <main>
            {children} 
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}