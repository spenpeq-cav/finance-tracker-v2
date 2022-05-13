import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const SideBarMenu = () => {
  const router = useRouter();
  const [overviewActive, setOverviewActive] = useState<boolean>(false);
  const [accountsActive, setAccountsActive] = useState<boolean>(false);
  const [settingsActive, setSettingsActive] = useState<boolean>(false);

  useEffect(() => {
    switch (router.pathname) {
      case "/dashboard":
        setOverviewActive(true);
        setAccountsActive(false);
        setSettingsActive(false);
        break;
      case "/dashboard/accounts":
        setAccountsActive(true);
        setSettingsActive(false);
        setOverviewActive(false);
        break;
      case "/dashboard/settings":
        setSettingsActive(true);
        setAccountsActive(false);
        setOverviewActive(false);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="bg-neutral-700 fixed top-0 left-0 overflow-auto pt-6 h-screen w-sidebar-width border-r-2 border-teal-600">
      <div className="flex flex-col">
        <h1 className="text-teal-400 font-bold text-3xl tracking-wide">
          <Link href="/">
            <a>Finance Tracker</a>
          </Link>
        </h1>
        <ul className="mt-8 text-neutral-200 font-semibold text-xl tracking-wider">
          <li
            className={
              overviewActive
                ? "px-8 py-2 border-b-2 border-t-2 border-teal-600 bg-teal-600"
                : "hover:bg-teal-700 px-8 py-2 border-b-2 border-t-2 border-teal-600 hover:bg-opacity-20"
            }
          >
            <Link href="/dashboard">
              <a className="w-full">Overview</a>
            </Link>
          </li>
          <li
            className={
              accountsActive
                ? "px-8 py-2 border-b-2 border-teal-600 bg-teal-600"
                : "hover:bg-teal-700 px-8 py-2 border-b-2 border-teal-600 hover:bg-opacity-20"
            }
          >
            <Link href="/dashboard/accounts">
              <a className="">Accounts</a>
            </Link>
          </li>
          <li
            className={
              settingsActive
                ? "px-8 py-2 border-b-2 border-teal-600 bg-teal-600"
                : "hover:bg-teal-700 px-8 py-2 border-b-2 border-teal-600 hover:bg-opacity-20"
            }
          >
            <Link href="/dashboard/settings">
              <a>Settings</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBarMenu;
