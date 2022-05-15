import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/AccessDenied";
import SideBarMenu from "../../components/SideBarMenu";
import CircleLoader from "react-spinners/CircleLoader";
import TopSection from "../../components/TopSection";

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
          <TopSection />
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
                className="border-2 border-teal-600 rounded-lg bg-neutral-800 p-4 col-span-4 text-left w-5/12 mb-4"
              >
                <h1 className="text-4xl font-bold text-neutral-100 tracking-wider">
                  {acc.item.institution_id}
                </h1>
                <p className="text-lg border-b-2 border-teal-700 text-neutral-300 tracking-wide pb-2">
                  Accounts: {acc.accounts.length}
                </p>

                {acc.accounts.map((item: any, j: number) => (
                  <div
                    key={j}
                    className="text-neutral-300 pt-2 text-lg flex"
                  >
                    <p className="font-bold tracking-widest flex-auto">
                      {item.name}
                    </p>
                    <p className="tracking-wider font-semibold flex-auto text-right">
                      ${" "}
                      {item.balances.current.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Accounts;
