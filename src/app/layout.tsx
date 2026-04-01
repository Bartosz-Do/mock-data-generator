import { ReactNode } from "react";
import { Metadata } from "next";
import "./styles/default.scss";
import "prismjs/themes/prism-solarizedlight.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "mock data generator",
  description: "test components",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
