import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
import Provider from "@/redux/Provider";
import NavbarScrollExample from "./components/Navbar1";
import Footer from "./components/Footer";
import Top from "./components/TopButton";
import Whatsaap from "./components/Whatsaap";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "HaMn.S - Haute Apparel & Modern Narratives Studio",
    template: "%s - HaMn.S - Haute Apparel & Modern Narratives Studio"
  },
  description: "haMnS offers the best T-shirts in Pakistan, combining premium quality. Our collection of men&apos;s T-shirts features trendy designs, durable fabrics, and a perfect fit for every occasion.  We brings you the finest selection of premium T-shirts in Pakistan. Shop now for unmatched quality and style!",
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hamnswear.com" />
        <meta property="og:image" content="https://www.hamnswear.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://www.hamnswear.com/twitter-image.jpg" />
        <link rel="canonical" href="https://www.hamnswear.com" />
        <title>{metadata.title}</title>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Cappello",
            "url": "https://www.hamnswear.com/",
            "logo": "https://www.hamnswear.com/logo.jpg",
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61574063793341",
              "https://www.instagram.com/hamn.s.wear?utm_source=qr&igsh=MWszMXdyZnU4NW5seA%3D%3D",
            ]
          })}
        </script>
        <meta name="google-site-verification" content="O6NCI0ZiVDEhIoi8PAXN5c-rEJThE4UI_0LCe3XZiQg" />
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          <Provider>
            <NavbarScrollExample />
            <Top />
            <Whatsaap />
            {children}
            <Footer />
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
