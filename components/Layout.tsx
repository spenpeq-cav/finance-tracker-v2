import styles from "../styles/Layout.module.css";
import Nav from "./Nav";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      {/* <Nav /> */}
      <div className="py-0 px-8 bg-gradient-to-tr from-gray-900 to-slate-900">
        <main className="main">{children}</main>
      </div>
    </>
  );
};

export default Layout;
