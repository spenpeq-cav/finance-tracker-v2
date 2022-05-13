import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/AccessDenied";
import SideBarMenu from "../../components/SideBarMenu";
import CircleLoader from "react-spinners/CircleLoader";

const Accounts: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [accountsData, setAccountsData] = useState<any[]>([]);
  const [totalInst, setTotalInst] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/plaid/get_accounts", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setAccountsData(data);
      setTotalInst(data.length);
      setDataLoading(false);
    };

    fetchData();
  }, []);

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
              Accounts
            </h1>
          </div>

          <div className="col-span-4 py-6">
            <h1 className="text-neutral-200 font-bold text-4xl text-left">
              {"Total Linked Institutions: " + totalInst}
            </h1>
            {/* <BounceLoader color={"#a3e635"} loading={dataLoading} css={""} size={60} speedMultiplier={2} /> */}
          </div>

          <div className="col-span-4 text-center">
            <CircleLoader
              color={"#14b8a6"}
              loading={dataLoading}
              css={""}
              size={120}
              speedMultiplier={1}
            />
          </div>

          {accountsData &&
            accountsData.map((acc, index) => (
              <div
                key={index}
                className="border-2 border-teal-600 rounded-lg bg-neutral-800 p-4 col-span-4 text-center w-1/2"
              >
                <h1 className="text-4xl py-4 font-bold text-neutral-100 tracking-wider">
                  {index + 1} | {acc.request_id} | {acc.accounts.length} |{" "}
                  {acc.item.institution_id}
                </h1>
                {acc.accounts.map((item: any, index: any) => (
                  <p key={index} className="text-neutral-200">
                    {item.name} | {item.account_id} | {item.balances.current}
                  </p>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Accounts;
