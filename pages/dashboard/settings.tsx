import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/AccessDenied";
import PlaidLink from "../../components/PlaidLink";
import SideBarMenu from "../../components/SideBarMenu";
import RemoveAccount from "../../components/RemoveAccount";
import TopSection from "../../components/TopSection";

const Settings: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [linkToken, setLinkToken] = useState(null);

  const getLinkToken = async () => {
    const response = await fetch("/api/plaid/create_link_token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

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
        <div className="grid grid-cols-4 gap-2 justify-items-start">
          <TopSection />
          <div className="border-b-4 border-teal-700 col-span-4 py-6 text-left">
            <div className="col-span-4 py-6">
              <h1 className="text-neutral-200 font-bold text-4xl text-left">
                Add another account
              </h1>
              <p className="text-neutral-400 text-xl text-left">
                Connect with Plaid
              </p>
            </div>
            <div className="col-span-4 pb-6">
              <p className="text-neutral-200 text-xl text-left col-span-4 pb-4">
                Step 1. Generate link token
              </p>
              <button
                onClick={getLinkToken}
                className={
                  linkToken !== null
                    ? "btn btn-disabled py-4 px-12"
                    : "btn btn-primary py-4 px-12"
                }
                disabled={linkToken !== null}
              >
                Generate Token
              </button>
            </div>

            {/* {linkToken && <p className="text-white">{linkToken}</p>} */}
            {linkToken != null ? (
              <div className="col-span-4 text-left">
                <p className="text-neutral-200 text-xl text-left pb-4">
                  Step 2. Link your account
                </p>
                <PlaidLink linkToken={linkToken} />
              </div>
            ) : (
              <></>
            )}
          </div>

          <RemoveAccount />
        </div>
      </div>
    </>
  );
};
export default Settings;
