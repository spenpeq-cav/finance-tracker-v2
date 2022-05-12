import Link from "next/link";

const SideBarMenu = () => {
  return (
    <div className="bg-neutral-700 fixed top-0 left-0 overflow-auto pt-6 h-screen w-sidebar-width border-r-2 border-teal-600">
      <div className="flex flex-col">
        <h1 className="text-teal-400 font-bold text-3xl tracking-wide"><Link href="/"><a>Finance Tracker</a></Link></h1>
        <ul className="mt-8 text-neutral-200 font-semibold text-xl tracking-wider">
          <li className="hover:bg-teal-900 px-8 py-2 border-b-2 border-teal-600">
            <Link href="/dashboard">
              <a className="w-full">Overview</a>
            </Link>
          </li>
          <li className="hover:bg-teal-900 px-16 py-2 border-b-2 border-teal-600">
            <Link href="/dashboard/accounts">
              <a className="">Accounts</a>
            </Link>
          </li>
          <li className="hover:bg-teal-900 px-16 py-2 border-teal-600">
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
