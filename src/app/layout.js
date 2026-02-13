import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SaaSKit - Modern SaaS Boilerplate",
  description: "Production-ready SaaS starter with Auth, Billing, and Admin Dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
