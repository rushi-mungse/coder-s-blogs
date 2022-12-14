import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="container mx-auto">
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </main>
  );
}

export default MyApp;
