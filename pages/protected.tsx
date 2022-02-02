import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";
import PlaidLink from "../components/PlaidLink";
import Link from "next/link";

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = useState();
  const [linkToken, setLinkToken] = useState(null);
  const [accountData, setAccountData] = useState(null);

  const getLinkToken = async () => {
    const response = await fetch("/api/plaid/create_link_token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  const getAccounts = async () => {
    const response = await fetch("/api/plaid/get_accounts", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    // setAccountData(data.plaidItems);
  };

  const getTransactions = async () => {
    const response = await fetch("/api/plaid/get_transactions", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    // setAccountData(data.plaidItems);
  };

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <AccessDenied />
      </>
    );
  }

  // If session exists, display content
  return (
    <div>
      <h1 className="text-white">Protected Page</h1>
      <p className="text-white">
        <strong>{content || "\u00a0"}</strong>
      </p>
      <button
        onClick={getAccounts}
        className="text-cyan-900 border-2 p-6 border-cyan-500 mt-10 bg-slate-300"
      >
        GET ACCOUNTS
      </button>
      <button
        onClick={getTransactions}
        className="text-cyan-900 border-2 p-6 border-cyan-500 mt-10 bg-slate-300"
      >
        GET TRANSACTIONS
      </button>
      <button
        onClick={getLinkToken}
        className="text-cyan-900 border-2 p-6 border-cyan-500 mt-10 bg-slate-300"
      >
        Link Token
      </button>

      <Link href="/dashboard">
        <a className="btn btn-secondary py-4 px-12">Dashboard</a>
      </Link>

      {linkToken && <p className="text-white">{linkToken}</p>}
      {linkToken != null ? <PlaidLink linkToken={linkToken} /> : <></>}
      {accountData && <p className="text-white">{accountData}</p>}
    </div>
  );
}
