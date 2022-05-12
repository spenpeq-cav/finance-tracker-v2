import styles from "../styles/Layout.module.css";
import Nav from "./Nav";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      {/* <Nav /> */}
      <div className="p-0 bg-neutral-900">
        <main className="main">{children}</main>
      </div>
    </>
  );
};

export default Layout;
