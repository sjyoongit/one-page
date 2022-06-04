import Head from "next/head";
import Header from "../components/Header";
import Visual from "../components/Visual";
import About from "../components/About";
import Vision from "../components/Vision";
import Sns from "../components/Sns";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>One Page</title>
        <meta name="description" content="One Page Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Visual />
        <About />
        <Vision />
        <Sns />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
