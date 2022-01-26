import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";
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
      <div className="bg-slate-600 fixed top-0 left-0 overflow-auto pt-12 h-screen w-sidebar-width">
        <div className="flex flex-col">
          <ul className="mt-4 text-slate-200 font-semibold text-xl">
            <li className="hover:bg-lime-800 px-8 py-2 border-2 border-lime-400">
              Dashboard
            </li>
            <li className="hover:bg-lime-800 px-16 py-2 border-2 border-lime-400">
              Accounts
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg relative h-screen w-content-width left-60 p-24">
        <h1 className="text-white">Dashboard</h1>
        <p className="text-white">
          <strong>{content || "\u00a0"}</strong>
        </p>
        <div className="text-slate-200">
          {accountData &&
            accountData.map((acc) => (
              <p key={acc.account_id}>
                {acc.name} | {acc.balances.current}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
