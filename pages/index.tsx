import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Layout.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Finance Tracker</title>
        <meta name="description" content="Track finances with Plaid API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-5xl font-bold text-cyan-500 py-4">Finance Tracker</h1>
        <p className="text-lg font-semibold text-cyan-500">View all your accounts in one place, utilizing Plaid.</p>
      </main>
    </div>
  );
};

export default Home;
