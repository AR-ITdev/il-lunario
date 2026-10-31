import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagicCursor from "@/components/MagicCursor";
import { LanguageProvider } from "@/components/LanguageProvider";
import SkipLink from "@/components/SkipLink";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  icons: { icon: "/logo-il-lunario.png" },
  title: {
    default: "Il Lunario — Storie da scoprire",
    template: "%s | Il Lunario",
  },
  description:
    "Libri, fumetti, giochi da tavolo e carte collezionabili. Entra nel mondo de Il Lunario e trova la tua prossima storia.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={`${display.variable} ${sans.variable}`}>
        <LanguageProvider>
          <SkipLink />
          <Header />
          <main id="contenuto">{children}</main>
          <Footer />
          <MagicCursor />
        </LanguageProvider>
      </body>
    </html>
  );
}
