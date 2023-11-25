// "use client";
import { Navbar, FloatingWhatsapp } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "@/components/Context";

import Script from "next/script";
import { Metadata } from "next";
export const metadata: Metadata = {
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
    "leather",
    "leather pump cups",
    "PumpCups",
    "Pump Cups",
    "PumpCups.com",
    "sefaudi.com",
    "ozincegedik",
    "conta",
    "leather pump cup",
    "leather pump cup set",
    "leather pump cup set price",
    "leather pump cup price",
    "pump cup leather",
    "pump cup leather set",
    "pump cup leather set price",
    "pump cup leather price",
    "pump cup set leather",
    "pump cup set leather price",
    "pump cup set leather set",
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
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-JXYQDS45J4"
          ></Script>
          <Script
            id="gtag"
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    gtag('config', 'G-JXYQDS45J4');`,
            }}
          ></Script>
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
