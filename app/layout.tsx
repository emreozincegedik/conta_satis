// "use client";
import { Navbar, FloatingWhatsapp } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "@/components/Context";

const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
export const metadata = {
  title: "Sefaudi",
  description: "Sefa Udi Store",
  authors: [{ name: "Emre Özincegedik" }, { name: "Sefa Özincegedik" }],
  keywords: [
    "Sefa",
    "Udi",
    "Store",
    "Sefaudi",
    "Sefaudi Store",
    "Pump Cups",
    "Pump",
    "Cups",
    "PumpCups",
    "Pump Cups",
    "PumpCups.com",
    "sefaudi.com",
    "ozincegedik",
    "conta",
    "pump cup set",
    "pump cup set price",
    "gas stove pump cup",
    "gas stove pump cup set",
    "gaz ocağı pompası",
    "gaz ocağı conta",
    "gaz ocağı conta seti",
    "gaz ocağı conta takımı",
    "gaz ocağı conta takımı fiyatları",
    "gaz ocağı conta takımı fiyatı",

    "gaz ocağı conta takımı satın al",
    "gaz ocağı conta takımı satış",
  ],
  publisher: "Sefa Udi",
  viewport: "width=device-width, initial-scale=1",
  category: "Pump Cups",
  applicationName: "Sefaudi",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* {pathname !== "/paymentx" ? ( */}
      <GlobalContextProvider>
        <html lang="en">
          <body>
            <Script src="https://www.paytr.com/js/iframeResizer.min.js"></Script>
            <Navbar />
            {children}
            {/* <FloatingWhatsapp /> */}
          </body>
        </html>
      </GlobalContextProvider>
      {/* ) : (
        { children }
      )} */}
    </>
  );
}
