import { ReactNode } from "react";
import { Metadata } from "next";
import "./styles/default.scss";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "test components",
  description: "test components",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
