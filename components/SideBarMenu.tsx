import Link from "next/link";

const SideBarMenu = () => {
  return (
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
  );
};
export default SideBarMenu;
