import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Visual from "../components/Visual";
import About from "../components/About";
import Vision from "../components/Vision";
import Sns from "../components/Sns";
import Contact from "../components/ContactFormEx";
import Footer from "../components/Footer";
import FloatingChat from "../components/FloatingChat";
import { fetchQuery } from "../utils/helper";
import Fab from "@mui/material/Fab";

export default function Home({ interchanges }) {
  const [floatToggle, setFloatToggle] = useState(false);
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
        <Fab
          color="primary"
          aria-label="add"
          className="float_btn"
          onClick={() => setFloatToggle((current) => !current)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </Fab>
        <FloatingChat interchanges={interchanges} float={floatToggle} />
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const interchanges = await fetchQuery("api/interchanges");
  return {
    props: {
      interchanges,
    },
  };
}
