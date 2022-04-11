import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/AccessDenied";
import Link from "next/link";
import PlaidLink from "../../components/PlaidLink";

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
        <div className="grid grid-cols-4 gap-2 justify-items-start">
          <div className="col-span-4 border-b-2 border-lime-600 pb-6">
            <h1 className="text-slate-200 font-extrabold text-5xl">
              <span className="text-lime-200">
                {session.user?.name?.split(" ")[0]}&rsquo;s{" "}
              </span>{" "}
              Settings
            </h1>
          </div>
          <div className="col-span-4 py-6">
            <h1 className="text-slate-200 font-bold text-4xl text-left">
              Add another account
            </h1>
            <p className="text-slate-400 text-xl text-left">
              Connect with Plaid
            </p>
          </div>
          <div className="col-span-4 pb-6">
            <p className="text-slate-200 text-xl text-left col-span-4 pb-4">
              Step 1. Generate link token
            </p>
            <button
              onClick={getLinkToken}
              className={linkToken !== null ? "btn btn-disabled py-4 px-12" : "btn btn-primary py-4 px-12"}
              disabled={linkToken !== null}
            >
              Generate Token
            </button>
          </div>

          {/* {linkToken && <p className="text-white">{linkToken}</p>} */}
          {linkToken != null ? (
            <div className="col-span-4 text-left">
              <p className="text-slate-200 text-xl text-left pb-4">
                Step 2. Link your account
              </p>
              <PlaidLink linkToken={linkToken} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Settings;
