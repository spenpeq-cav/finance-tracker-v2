import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";
import NetWorth from "../components/NetWorth";
import RecentTransactions from "../components/RecentTransactions";
import SideBarMenu from "../components/SideBarMenu";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = useState();
  const [accountsData, setAccountsData] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [transactionDataLoading, setTransactionDataLoading] =
    useState<boolean>(true);

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
      console.log(data);
      setAccountsData(data);

      if (data.length > 0) {
        const transResponse = await fetch("/api/plaid/get_transactions", {
          method: "GET",
        });
        const transData = await transResponse.json();
        setTransactionData(transData);
        setTransactionDataLoading(false);
      }
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
      <SideBarMenu />

      <div className="rounded-lg relative h-full w-content-width left-60 p-24">
        <div className="grid grid-cols-4 gap-4 justify-items-start">
          <div className="col-span-4 border-b-4 border-teal-700 pb-6">
            <h1 className="text-neutral-200 font-extrabold text-5xl tracking-wider">
              <span className="text-teal-400">
                {session.user?.name?.split(" ")[0]}&rsquo;s{" "}
              </span>{" "}
              Dashboard
            </h1>
          </div>
          <NetWorth content={content} accountsData={accountsData} />
          <RecentTransactions
            transactionData={transactionData}
            isLoading={transactionDataLoading}
          />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
