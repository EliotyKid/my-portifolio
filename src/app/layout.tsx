import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Elias Rodrigues — Desenvolvedor web",
    template: "%s | Elias Rodrigues",
  },
  description:
    "Sites dinâmicos e interativos. Conheça os projetos de desenvolvimento web de Elias Rodrigues.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const language =
    (await headers()).get("x-portfolio-language") === "en" ? "en" : "pt-BR";
  return (
    <html lang={language}>
      <body>
        <Suspense
          fallback={
            <header className="site-header">
              <span className="brand">© Elias Rodrigues</span>
            </header>
          }
        >
          <Header />
        </Suspense>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
