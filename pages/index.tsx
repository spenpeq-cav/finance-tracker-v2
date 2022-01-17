import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "../components/Link";

const Home: NextPage = () => {
  const [linkToken, setLinkToken] = useState(null);

  const getLinkToken = async () => {
    const response = await fetch("/api/create_link_token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  return (
    <div>
      <Head>
        <title>Finance Tracker</title>
        <meta name="description" content="Track finances with Plaid API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-5xl font-bold text-cyan-500 py-4">
          Finance Tracker
        </h1>
        <p className="text-lg font-semibold text-cyan-500">
          View all your accounts in one place, utilizing Plaid.
        </p>
        <button
          onClick={getLinkToken}
          className="text-cyan-900 border-2 p-6 border-cyan-500 mt-10 bg-slate-300"
        >
          Link Token
        </button>
        {linkToken && <p className="text-white">{linkToken}</p>}
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
      </main>
    </div>
  );
};

export default Home;
