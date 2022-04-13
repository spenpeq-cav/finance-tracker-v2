import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";
import Link from "next/link";
import Nav from "../components/Nav";
import NetWorth from "../components/NetWorth";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = useState();
  const [accountsData, setAccountsData] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [transactionDataLoading, setTransactionDataLoading] = useState<boolean>(true)

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }

      const response = await fetch("/api/plaid/get_accounts", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data)
      setAccountsData(data);

      const transResponse = await fetch("/api/plaid/get_transactions", {
        method: "GET",
      });
      const transData = await transResponse.json();
      setTransactionData(transData);
      setTransactionDataLoading(false)
    };
    // const getAccounts = async () => {
    //   const response = await fetch("/api/get_accounts", {
    //     method: "GET",
    //   });
    //   const data = await response.json();
    //   setAccountData(data);
    // };
    fetchData();
    // getAccounts();
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
    <>
      <div className="bg-slate-600 fixed top-0 left-0 overflow-auto pt-6 h-screen w-sidebar-width border-r-2 border-lime-600">
        <div className="flex flex-col">
          <h1 className="text-slate-200 font-bold text-3xl">Finance Tracker</h1>
          <ul className="mt-8 text-slate-200 font-semibold text-xl">
            <li className="hover:bg-lime-800 px-8 py-2 border-b-2 border-lime-600">
              <Link href="/dashboard">
                <a>Overview</a>
              </Link>
            </li>
            <li className="hover:bg-lime-800 px-16 py-2 border-b-2 border-lime-600">
              <Link href="/dashboard/accounts">
                <a className="">Accounts</a>
              </Link>
            </li>
            <li className="hover:bg-lime-800 px-16 py-2 border-lime-600">
              <Link href="/dashboard/settings">
                <a>Settings</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg relative h-full w-content-width left-60 p-24">
        <div className="grid grid-cols-4 gap-4 justify-items-start">
          <div className="col-span-4 border-b-2 border-lime-600 pb-6">
            <h1 className="text-slate-200 font-extrabold text-5xl">
              <span className="text-lime-200">{session.user?.name?.split(" ")[0]}&rsquo;s </span> Dashboard
            </h1>
          </div>
          <NetWorth content={content} accountsData={accountsData} />
          <RecentTransactions transactionData={transactionData} isLoading={transactionDataLoading} />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
