import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";
import Link from "next/link";
import Nav from "../components/Nav";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = useState();
  const [accountData, setAccountData] = useState<any[]>([]);

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
      const response = await fetch("/api/get_accounts", {
        method: "GET",
      });
      const data = await response.json();
      const accounts = data.accounts;
      setAccountData(Array.from(accounts));
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
    console.log(accountData);
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
      <div className="bg-slate-800 fixed top-0 left-0 overflow-auto pt-6 h-screen w-sidebar-width border-r-2 border-lime-600">
        <div className="flex flex-col">
          <h1 className="text-slate-200 font-bold text-3xl">Finance Tracker</h1>
          <ul className="mt-8 text-slate-200 font-semibold text-xl">
            <li className="hover:bg-lime-800 px-8 py-2 border-b-2 border-lime-600">
              <Link href="/dashboard">
                <a>Dashboard</a>
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

      <div className="rounded-lg relative h-screen w-content-width left-60 p-24">
        <div className="grid grid-cols-3 gap-4 justify-items-start">
          <div className="col-span-3 ">
            <h1 className="text-slate-200 font-extrabold text-5xl">
              {session.user?.name}'s Dashboard
            </h1>
          </div>
          <div className="border-2 border-lime-600 rounded-lg bg-slate-800 p-4 w-full">
            <p className="text-lime-600 text-5xl">
              $ 75,000
            </p>
            <p className="text-rose-600 text-5xl">
              - 30,000
            </p>
            <hr className="text-slate-200 my-2"/>
            <p className="text-lime-400 font-extrabold text-6xl">
              $ 30,000
            </p>
          </div>
          <div className="border-2 border-lime-600 rounded-lg bg-slate-800">
            <p className="text-slate-200">
              <strong>{content || "\u00a0"}</strong>
            </p>
          </div>
          <div className="text-slate-200 border-2 border-lime-600 rounded-lg bg-slate-800">
            {accountData &&
              accountData.map((acc) => (
                <p key={acc.account_id}>
                  {acc.name} | {acc.balances.current}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
